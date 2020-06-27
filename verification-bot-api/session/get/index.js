"use strict";




const handler = (key) => {

  return new Promise((resolve, reject) => {

    global.redis.get(key, (err, json) => {

      if (err) {
        return reject(err)
      }

      if (json) {

        try {

          const session = JSON.parse(json)

          resolve(session)

        } catch (err) {
          reject(err);
        }

      }
      
      resolve({})
    })

  })

};




module.exports = handler;
