"use strict";




const handler = (ctx, next) => {

  if (ctx. session [ctx. from. id]) {
  next ();
    return undefined;
  }


  global. handler. checkExistUser (ctx. from, (err, data) => {

    if (err) {
      ctx. reply ("error stac trays");
      return undefined;
    }


    if (data !== "notExist") {
      ctx. session [ctx. from. id] = data;
      next ();
      return undefined;
    }


    global. handler. saveUser (ctx. from, (err, data) => {

      if (err) {
        console. log (err);
        return undefined;
      }


      if (!data) {
        console. log ("notExist");
        return undefined;
      }


      next ();
      return undefined;;
  });


    return undefined;
  });


  return undefined;
};




module. exports = () => handler;
