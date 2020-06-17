"use strict";


const typeEnv = global.process.env.TYPE_ENV;




const obj = {
  "store": {
    "host": "parkinson-bot-redis",
    "port": 6379
  }
};


const handler = () => {

  if (typeEnv === "docker") {
    return obj;
  }


  obj. store. host = "127.0.0.212";
  return obj;
};




module. exports = () => handler;
