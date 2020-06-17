"use strict";



const handler = (email) => {

  const pattern = /^([^\n\s\r\t\v\b\f]+)(@)([^\n\s\r\t\v\b\f])+$/;


  const result = pattern. test (email);


  return result;

};




module. exports = () => handler;
