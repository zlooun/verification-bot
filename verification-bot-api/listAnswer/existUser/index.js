"use strict";




const handler = (from, callback) => {

  const str = `Привет ${ from. first_name} ${ from. last_name }! А мы с тобой уже знакомы.`;


  callback (str);
  return undefined;
};




module. exports = () => handler;
