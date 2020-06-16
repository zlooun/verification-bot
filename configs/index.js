"use strict";




const handler = () => {
  return {
    "session": require ("./session") (),
    "mongo": require ("./mongo") ()
  };
};




module. exports = () => handler;
