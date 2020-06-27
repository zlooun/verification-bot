"use strict";


const mongoose = require("mongoose");




const obj = {
  "Request": mongoose.model("Request", require ("./request")),
};




module.exports = obj;
