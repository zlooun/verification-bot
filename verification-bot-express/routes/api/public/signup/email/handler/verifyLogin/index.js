"use strict";



const handler = (login) => {

  const pattern = /^([^0-9])+([a-z0-9\.\-])+$/;


  const result = pattern. test (login);


  return result;

};




module. exports = () => handler;
