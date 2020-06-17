"use strict";




const hsc = require ("htmlspecialchars");
const trim = require ("trim");
const phone = require ("phone");




const handler = (req, res, idUser) => {

  let phone = req. body. phone;


  phone = hsc (phone);
  phone = trim (phone);


  phone = phone (tel, "RU") [0];


  const updateObj = {
    phone
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


  return undefined;

};




module. exports = () => handler;
