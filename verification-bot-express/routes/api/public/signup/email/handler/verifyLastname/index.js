"use strict";




const handler = (lastname) => {

  const pattern = /^([^\n\s\r\t\v\b\f])+$/;


  const result = pattern. test (lastname);


  return result;

};




module. exports = () => handler;
