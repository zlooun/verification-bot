"use strict";




const add = require ("./add")();
const remove = require ("./remove")();
const receive = require ("./receive")();


const handler = (req, res) => {


  if (req.body.method === "add") {
    console.log("method = add.\n");
    add (req, res);
    return undefined;
  }


  if (req.body.method === "remove") {
    console.log("method = remove.\n");
    remove(req, res);
    return undefined;
  }


  if (req.body.method === "receive") {
    console.log("method = receive.\n");
    receive(req, res);
    return undefined;
  }


  res.json(global.listStatus.invalidMethod());
  return undefined;
};




module. exports = () => handler;
