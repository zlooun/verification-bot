"use strict";




const handler = (password) => {

  const pattern = /^([^\n\s\r\t\v\b\f]){6,}$/;


  const result = pattern. test (password);


  return result;

};




module. exports = () => handler;
