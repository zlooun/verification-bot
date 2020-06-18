"use strict";




const Schema = require("mongoose").Schema;




const obj = new Schema ({
  "lang": String,
  "typeTemplate": String,
  "subject": String,
  "template": String,
  "uuid": String,
  "createDate": Date,
  "ofCreateDate": Date,
  "toCreateDate": Date
});




module.exports = obj;
