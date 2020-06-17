"use strict";




const handler = () => {
  return {
    "connectInternal": require ("./connectInternal") (),
    "session": require ("./session") (),
    "express": require ("./express") ()
  };
};




module. exports = () => handler;
