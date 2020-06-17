"use strict";




const router = require("router")();




router.post("/", require ("./handler")());




module.exports = () => router;
