"use strict";




const handler = () => {
  return {
    "session": require ("./session"),
    "mongo": require ("./mongo"),
    "winston": require ("./winston"),
    "redis": require ("./redis")
  };
};




module.exports = handler;
