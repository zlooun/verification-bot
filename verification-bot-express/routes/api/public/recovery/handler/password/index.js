"use strict";


const url = global. configs. connectExternal (). mail () [0]. to ();
const apiKey = global. configs. connectExternal (). mail () [0]. key;


const crypto = require ("crypto");


const hsc = require ("htmlspecialchars");
const trim = require ("trim");
const randomPassword = require ("random-password");
const axios = require ("axios");


const verifyLogin = require ("./verifyLogin") ();
const verifyEmail = require ("./verifyEmail") ();




const tableChar = "0123456789@.-ABCDeFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";


const template = (to, accident) => {

  const obj = {
    "apiKey": apiKey,
    "to": to,
    "subject": "Восстановление доступа к личному кабинету",
    "text": `Здравствуйте! Ваш пароль был изменён при восстановлении. Новый пароль ${ accident } \n Обязательно его измените для лучшей безопасности. Если это сделали не Вы, обратитесь в поддержку! Всего хорошего!`
  };


  return obj;

};




const handler = (req, res) => {

console. log ("email");

  let login = req. body. login;
  let email = req. body. email;


  login = hsc (login);
  email = hsc (email);


  login = trim (login);
  email = trim (email);


  login = login. toLowerCase ();
  email = email. toLowerCase ();


  if (!verifyLogin (login)) {
    res. json (global. listStatus. invalidLogin ());
    return undefined;
  }


  if (!verifyEmail (email)) {
    res. json (global. listStatus. invalidEmail ());
    return undefined;
  }


  const findObj = {
    "login": login,
    "email": email
  };


  global. mongoModels. User. findOne (findObj, (err, doc) => {

    if (err) {
      console. log (err);
      res. json (global. listStatus. notSuccess ());
      return undefined;
    }


    if (!doc) {
      res. json (global. listStatus. notExist ());
      return undefined;
    }


    const password = randomPassword (10, tableChar);
    const hashPassword = crypto. createHash ("sha512"). update (password + doc. uuid + doc. salt). digest ("hex");


    const updateObj = {
      "password": hashPassword
    };


    global. mongoModels. User. findOneAndUpdate (findObj, updateObj, { "new": true }, (err, doc) => {

      if (err) {
        console. log (err);
        res. json (global. listStatus. notSuccess ());
        return undefined;
      }


      if (!doc) {
        res. json (global. listStatus. invalidEmail ());
        return undefined;
      }


      const sendObj = template (doc. email, password);


      axios. post (url, sendObj). then ( body => {

        if (body. data. status == "notSuccess") {
          res. json (global. listStatus. notSuccess ());
          return undefined;
        }


        res. json (global. listStatus. success ());
        return undefined;
      },


      err => {
        console. log (err);
        res. json (global. listStatus. notSuccess ());
        return undefined;
      });


      return undefined;
    });


    return undefined;
  });


  return undefined;
};




module. exports = () => handler;
