"use strict";




const hsc = require ("htmlspecialchars");
const trim = require ("trim");




const handler = (req, res, idUser) => {

  let name = req. body. name;


  name = hsc (name);
  name = trim (name);


  const updateObj = {
    name
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