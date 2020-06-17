"use strict";




const router = require("router")();




router.use("/signup", require ("./signup")());
router.use("/signin", require ("./signin")());
//router.use("/recovery", require ("./recovery")());




module.exports = () => router;
