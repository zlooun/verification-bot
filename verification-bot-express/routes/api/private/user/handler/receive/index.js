"use strict";




const all = require("./all")();
const id = require("./id")();
const current = require("./current")();


const patternFilter = ["idPermission", "__v", "password", "uuid", "createDate", "currentSession", "currentAuthToken", "salt"];


const handler = (req, res) => {

  if (req. body. submethod == "all") {
    console.log("submethod = all.\n");
    all (req, res, patternFilter);
    return undefined;
  }

  if (req. body. submethod == "id") {
    console.log("submethod = id.\n");
    id (req, res, patternFilter);
    return undefined;
  }

  if (req. body. submethod == "current") {
    console.log("submethod = current.\n");
    current (req, res, patternFilter);
    return undefined;
  }


  res. json (global. listStatus. invalidSubmethod ());

  return;
};




module. exports = () => handler;
