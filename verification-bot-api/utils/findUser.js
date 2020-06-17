"use strict";




const model = require ("./mainConnect") ();
const scanf = require ("scanf");


console. log ("Entry login or email user in lower case for find node from user");
let emailLogin = scanf ("%s");


const findObj = {};


console. log (emailLogin);
const pattern = /@+/;


if (pattern. test (emailLogin)) {
  findObj. email = emailLogin;
}


if (!pattern. test (emailLogin)) {
  findObj. login = emailLogin;
}


model. User. findOne (findObj, (err, doc) => {


  if (err) {
    console. log (err);
    return undefined;
  }


  console. log (doc);
  return undefined;
});
