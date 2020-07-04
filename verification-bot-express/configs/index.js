"use strict";




const handler = () => {
  return {
    "connectInternal": require("./connectInternal"),
    "express": require("./express"),
    "winston": require("./winston")
  };
};




module.exports = handler;
