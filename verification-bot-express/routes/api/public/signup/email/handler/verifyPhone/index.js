"use strict";




const phone = require("phone");




const handler = (tel) => {

  const number = phone(tel, "RU");
  console.log(number);


  return number;

};




module.exports = () => handler;
