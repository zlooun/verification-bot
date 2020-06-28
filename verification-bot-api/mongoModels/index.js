"use strict";


const mongoose = require("mongoose");




const obj = {
  "User": mongoose.model("User", require ("./user"))
};




module.exports = obj;
