"use strict";




const crypto = require("crypto");


const trim = require("trim");
const hsc = require("htmlspecialchars");
const uuidV1 = require("uuid/v1");


const verifyEmail = require("./verifyEmail")();
const verifyPassword = require("./verifyPassword")();
const updateRedis = require("./updateRedis");

const handler = (req, res) => {

  let email = req.body.email;
  let password = req.body.password;
  const token = req.body.token;


  global.redis.exists(token, (err, result) => {

    if (err) {
      console.log(err);
      res.json(global.listStatus.notSuccess());
      return undefined;
    }


    if (!result){
      console.log(`токен ${token} недействителен\n`);
      res.json(global.listStatus.tokenNotExist());
      return undefined;
    }


    email = hsc(email);
    password = hsc(password);


    email = trim(email);
    password = trim(password);


    email = email.toLowerCase();


    if (!verifyEmail(email)) {

      console.log(`email ${email} некорректен\n`);
      res.json(global.listStatus.invalidEmail());

      return undefined;
    }


    if (!verifyPassword(password)) {

      console.log(`пароль ${password} некорректен\n`);
      res.json(global.listStatus.invalidPassword());

      return undefined;
    }


    const createDate = Date.now();
    const uuid = uuidV1();

    const salt = crypto.createHash ("sha512").update(uuid + Math.random()).digest("hex");
    const hashPassword = crypto.createHash("sha512").update (password + uuid + salt).digest("hex");


    const saveUser = {
      "email": email,
      "password": hashPassword,
      "salt": salt,
      "phone": "",
      "createDate": createDate,
      "name": "",
      "lastname": "",
      "uuid": uuid,
      "activated": false,
      "lock": false,
      "lang": "en",
      "currentSession": "",
      "currentAuthToken": "",
      "idPermission": "",
      "links": [
        {
          name: "tg",
          link: ""
        },
        {
          name: "fb",
          link: ""
        },
        {
          name: "vk",
          link: ""
        },
        {
          name: "tw",
          link: ""
        }
      ],
      "photo": "",
      "root": false,
    };


    const checkExistUser = {
      email
    };


    console.log("Поиск email'а в бд\n");
    global.mongoModels.User.findOne(checkExistUser, (err, existUser) => {

      if (err) {

        console.log(err);
        res.json(global.listStatus.notSuccess());

        return undefined;
      }


      if (existUser && existUser.email == email) {

        console.log(`Уже существует пользователь с email'ом ${email}\n`);
        res.json(global.listStatus.existEmail());

        return undefined;
      }


      const user = new global.mongoModels.User(saveUser);


      user.save((err, doc) => {

        if (err) {

          console.log(err);
          res.json(global.listStatus.notSuccess());

          return undefined;
        }

        if (!doc){

          console.log("Пользователь не создался.\n");
          res.json(global.listStatus.notSuccess(null, "Пользователь не создался в базе"));

          return undefined;
        }

        console.log("Пользователь зарегистрирован.\n");
        res. json (global.listStatus.success());

        global.handler.createPermission(doc._id, updateRedis(token, doc));

        return undefined;
      });

      return undefined;
    });

  });

};




module. exports = () => handler;
