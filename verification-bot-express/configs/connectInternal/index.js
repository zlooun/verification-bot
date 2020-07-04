"use strict";




const handler = () => {
  return {
    "mongo": require("./mongo"),
    "redis": require("./redis")
  };
};




module. exports = handler;
