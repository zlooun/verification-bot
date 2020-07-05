"use strict";




const router = require("router")();


router.use("/sendNotification", require("./middleware"), require("./sendNotification"));




module.exports = router;
