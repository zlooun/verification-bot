"use strict";




const toDepartment = require ("./toDepartment") ();
const toSystem = require ("./toSystem")();

const handler = (req, res) => {

  const idUser = req.user._id.toString();

  if (req.body.submethod === "toDepartment") {
    console.log("submethod = toDepartment.\n");
    toDepartment(req, res, idUser);
    return undefined;
  }


  if (req.body.submethod === "toSystem") {
    console.log("submethod = toSystem.\n");
    toSystem(req, res, idUser);
    return undefined;
  }


  res. json (global. listStatus. invalidSubmethod ());


  return undefined;

};




module. exports = () => handler;
