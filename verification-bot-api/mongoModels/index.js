"use strict";


const mongoose = require("mongoose");




const obj = {
  "User": mongoose.model("User", require ("./user")),
  "Template": mongoose.model("Template", require("./template"))
};




module.exports = obj;
