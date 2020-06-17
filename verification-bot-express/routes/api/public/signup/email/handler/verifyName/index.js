"use strict";




const handler = (name) => {

  const pattern = /^([^\n\s\r\t\v\b\f])+$/;


  const result = pattern. test (name);


  return result;

};




module. exports = () => handler;
