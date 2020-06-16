"use strict";




const handler = (from, callback) => {

  const str = `Данный раздел в разработке`;


  callback (str);
  return undefined;
};




module. exports = () => handler;
