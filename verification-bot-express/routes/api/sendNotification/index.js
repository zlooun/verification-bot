"use strict";




const saveRequest = require("./saveRequest");


const handler = (req, res) => {

  let notification = req.body.notification;

  if (!notification) {
    res.send("Notification is empty");
  }

  res.send("Success");


  notification = JSON.parse(notification);

  saveRequest(notification)
    .then(() => {
      console.log(JSON.stringify(notification));
      global.redis.publish("notification", JSON.stringify(notification));
    })
  

};




module. exports = () => handler;
