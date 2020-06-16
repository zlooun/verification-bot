"use strict";


const model = require ("./mainConnect") ();


model. User. remove ({}, (err, doc) => console. log (doc));
