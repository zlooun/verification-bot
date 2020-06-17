"use strict";


const env = {
  "NODE_ENV": "development",
  "TYPE_ENV": "localhost",
  "tokenParkinsonBot": ""
};




const handler = () => {

  for (let i in env) {
    global. process. env [i] = env [i];
  }


  return undefined;
};




module. exports = () => handler;
