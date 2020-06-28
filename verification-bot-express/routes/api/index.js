"use strict";




const router = require("router")();


router.use("/sendNotification", require("./sendNotification")());




module.exports = () => router;
