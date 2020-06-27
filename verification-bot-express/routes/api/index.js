"use strict";




const router = require("router")();


// router.use("/public", require("./public")());
// router.use("/private", require("./middlewarePrivate")(), require("./private")());
router.use("/sendNotification", require("./sendNotification")());




module.exports = () => router;
