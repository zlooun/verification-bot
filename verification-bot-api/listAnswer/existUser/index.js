"use strict";




const handler = (from) => {

  return new Promise((resolve, reject) => {

    const str = `Привет ${ from.first_name} ${ from.last_name }! А мы с тобой уже знакомы.`;

    resolve(str)

  })

};




module.exports = handler;
