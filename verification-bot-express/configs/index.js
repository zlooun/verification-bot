"use strict";




const handler = () => {
  return {
    "connectInternal": require ("./connectInternal") (),
    "session": require ("./session") (),
    "express": require ("./express") (),
    "winston": require ("./winston")
  };
};




module. exports = () => handler;
