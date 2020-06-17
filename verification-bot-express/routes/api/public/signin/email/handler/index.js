"use strict";




const handler = (req, res, next) => {

  global. passport. authenticate ("email", (err, user, info) => {

    if (err) {
      res. json (global. listStatus. notSuccess ());
      return undefined;
    }


    if (info === "lock") {
      res. json (global. listStatus. lock ());
      return undefined;
    }

    if (!user) {
      res. json (global. listStatus. notSuccess ());
      return undefined;
    }

    req. logIn (user, (err) => {

      if (err) {
        res. json (global. listStatus. notSuccess ());
        return undefined;
      }


      res. json (global. listStatus. success ());


      return undefined;
    });


    return undefined; 
  }) (req, res, next);


  return undefined;
};




module. exports = () => handler;
