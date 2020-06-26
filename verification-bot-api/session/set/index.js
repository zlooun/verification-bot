"use strict";




const handler = (key, data) => {

  return new Promise((resolve, reject) => {

    global.redis.set(key, JSON.stringify(data), (err) => {

      if (err) {
        return reject(err)
      }

      resolve()
    })

  })

};




module.exports = handler;
