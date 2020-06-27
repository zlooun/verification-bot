"use strict";




const hsc = require ("htmlspecialchars");
const trim = require ("trim");


const handler = (req, res, idUser) => {

  let links = req.body.links;

  console.log(links);

  for (let link of links) {
    link.link = hsc(link.link);
    link.link = trim(link.link);
  }

  const updateObj = {
    links
  };
  
  global. mongoModels. User. findByIdAndUpdate (idUser, updateObj, { "new": true }, (err, doc) => {

    if (err) {
      console. log (err);
      res. json (global. listStatus. notSuccess ());
      return undefined;
    }


    if (!doc) {
      res. json (global. listStatus. notUpdate ());
      return undefined;
    }


    res. json (global. listStatus. success ());
    return undefined;

  });

  return;
}




module.exports = () => handler;