"use strict";




const hsc = require ("htmlspecialchars");
const trim = require ("trim");


const receive = require ("./receive") ();
const update = require ("./update") ();




const handler = (req, res) => {

  let idUser = req.user._id;

  if (req. body. method == "receive") {

    receive (req, res, idUser);


    return undefined;

  }


  if (req. body. method == "update") {

    update(req, res);


    return undefined;

  }


  res. json (global. listStatus. invalidMethod ());


  return undefined;

};




module. exports = () => handler;
