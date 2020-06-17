"use strict";




const crypto = require ("crypto");


const hsc = require ("htmlspecialchars");
const trim = require ("trim");


const verifyPassword = require ("./verifyPassword") ();




const handler = (req, res, idUser) => {

  let oldPassword = req. body. oldPassword;
  let password = req. body. password;


  oldPassword = hsc (oldPassword);
  password = hsc (password);


  oldPassword = trim (oldPassword);
  password = trim (password);


  const salt = req. user. salt;
  const uuid = req. user. uuid;

  const findObj= {
    _id : idUser
  };

  global. mongoModels. User. findOne(findObj, (err, doc) => {
    if (err) {
      console. log (err);
      res. json (global. listStatus. notSuccess ());
      return undefined;
    }


    if (!doc) {
      res. json (global. listStatus. notUpdate ());
      return undefined;
    }

    const currentHashPassword = doc.password;

    const oldHashPassword = crypto. createHash ("sha512"). update (oldPassword + uuid + salt). digest ("hex");


    if (oldHashPassword !== currentHashPassword) {
      res. json (global. listStatus. notEquPassword ());
      return undefined;
    }


    if (!verifyPassword (password)) {
      res. json (global. listStatus. invalidPassword ());
      return undefined;
    }


    const hashPassword = crypto. createHash ("sha512"). update (password + uuid + salt). digest ("hex");


    const updateObj = {
      "password": hashPassword
    };


    global. mongoModels. User. findByIdAndUpdate (idUser, updateObj, { "new": true }, (err, doc) => {

      if (err) {
        console. log (err);
        res. json (global. listStatus. notSuccess ());
        return undefined;
      }


      if (!doc) {
        res. json (global. listStatus. notUpdate ());
        return undefined;
      }

      
      res. json (global. listStatus. success ());
      return undefined;

    });
  });


  return undefined;

};




module. exports = () => handler;
