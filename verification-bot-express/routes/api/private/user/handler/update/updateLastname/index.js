"use strict";




const hsc = require ("htmlspecialchars");
const trim = require ("trim");




const handler = (req, res, idUser) => {

  let lastname = req. body. lastname;


  lastname = hsc (lastname);
  lastname = trim (lastname);


  const updateObj = {
    lastname
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
