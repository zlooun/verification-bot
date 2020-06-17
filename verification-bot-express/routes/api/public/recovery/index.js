"use strict";




const router = require ("router") ();




router. use ("/", require ("./handler") ());




module. exports = () => router;
