"use strict";




const router = require("router")();




router.use("/api", require("./api"));
router.use("/*", require("./slash"));




module.exports = router;
