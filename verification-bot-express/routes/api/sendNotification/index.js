"use strict";




const saveRequest = require("./saveRequest");


const handler = (req, res) => {

  let notification = req.body.notification;

  if (!notification) {
    res.send("Notification is empty")
  }

  res.send("Success");


  notification = JSON.parse(notification);

  saveRequest(notification)
    .then(() => {
      
    })
  

};




module. exports = () => handler;
