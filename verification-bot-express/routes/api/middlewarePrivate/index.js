"use strict";




const handler = (req, res, next) => {


  res.send("123");


  return;
};




module.exports = () => handler;
