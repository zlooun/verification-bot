"use strict";




const model = require ("./mainConnect") ();
const scanf = require ("scanf");


model. User. find ({}, (err, docs) => {

  if (err) {
    console. log (err);
    return undefined;
  }


  for (let i of docs) {
    console. log (i);
  }


  return undefined;
});
