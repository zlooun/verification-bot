"use strict";




const handler = (from, callback) => {

  const str = `${ from. first_name } ${ from. last_name }, извини, этот раздел ещё не доделан. =(`;


  callback (str);
  return undefined;
};




module. exports = () => handler;
