"use strict";




const updateName = require ("./updateName") ();
const updateLastname = require ("./updateLastname") ();
const updatePassword = require ("./updatePassword") ();
const updatePhone = require ("./updatePhone") ();
const updateLang = require ("./updateLang") ();
const updateLinks = require("./updateLinks") ();
const updatePhoto = require("./updatePhoto")();


const handler = (req, res) => {

  const idUser = req.user._id;

  if (req. body. submethod == "name") {
    updateName (req, res, idUser);
    return undefined;
  }


  if (req. body. submethod == "lastname") {
    updateLastname (req, res, idUser);
    return undefined;
  }


  if (req. body. submethod == "password") {
    updatePassword (req, res, idUser);
    return undefined;
  }


  if (req. body. submethod == "phone") {
    updatePhone (req, res, idUser);
    return undefined;
  }


  if (req. body. submethod == "lang") {
    updateLang (req, res, idUser);
    return undefined;
  }


  if (req. body. submethod == "links") {
    updateLinks (req, res, idUser);
    return undefined;
  }


  if (req. body. submethod == "photo") {
    updatePhoto (req, res, idUser);
    return undefined;
  }


  res. json (global. listStatus. invalidSubmethod ());


  return undefined;

};




module. exports = () => handler;
