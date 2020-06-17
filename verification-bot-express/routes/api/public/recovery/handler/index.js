"use strict";





const password = require ("./password") ();




const handler = (req, res) => {


console. log ("recovery");

  if (req. body. method == "password") {
    password (req, res);
    return undefined;
  }


  res. json (global. listStatus. invalidMethod ());
  return undefined;
};




module. exports = () => handler;
