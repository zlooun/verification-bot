"use strict";




const handler = (notification) => {

  return new Promise((resolve, reject) => {

    notification.createDate = Date.now();


    const request = new global.mongoModels.Request(notification);

    request.save((err, doc) => {

      if (err) {
        console.log(err);
        reject(err);
      }

      if (!doc) {
        console.log("notExist");
        reject("notExist");
      }
      
      resolve(doc.toObject());

    });

  })

};




module.exports = handler;
