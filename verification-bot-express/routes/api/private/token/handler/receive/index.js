"use strict";




const current = require ("./current") ();
const all = require ("./all")();

const handler = (req, res) => {

  if (req.body.submethod === "current") {
    console.log("submethod = current.\n");
    current(req, res);
    return;
  }

  if (req.body.submethod === "all") {
    console.log("submethod = all.\n");
    all(req, res);
    return;
  }

  res.json(global.listStatus.invalidSubmethod ());

  return;
};




module. exports = () => handler;
