"use strict";




const handler = (key) => {

  return new Promise((resolve, reject) => {

    global.redis.get(key, (err, json) => {

      if (err) {
        return reject(err)
      }
      
      resolve()
    })

  })

};




module.exports = handler;
