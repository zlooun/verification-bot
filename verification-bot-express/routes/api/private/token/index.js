"use strict";




const router = require("router")();




router.use("/", require("./mwCheckTokenAndUpdate")(), require ("./handler")());




module.exports = () => router;
