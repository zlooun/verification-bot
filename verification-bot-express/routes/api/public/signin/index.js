"use strict";




const router = require ("router") ();




router. use ("/email", require ("./email") ());




module. exports = () => router;
