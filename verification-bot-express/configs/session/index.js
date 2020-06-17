"use strict";




const typeEnv = process. env. TYPE_ENV;
const nodeEnv = process. env. NODE_ENV;




const handler = (connectStore) => {

  const objSession = {
    "cookie": {},
    "name": "myfuckverybig",
    "secret": "fuckingOldVeryBeach",
    "rolling": true,
    "resave": true,
    "saveUninitialized": true,
  "store": connectStore
  };


  if (nodeEnv == "development") {
    objSession. cookie. sameSite = false;
  }


  if (nodeEnv == "production") {
    objSession. cookie. sameSite = true;
  }


  return objSession;
};




module. exports = () => handler;
