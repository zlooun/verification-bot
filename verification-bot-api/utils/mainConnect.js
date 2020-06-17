"use strict";




const mongoose = require ("mongoose");
const model = require ("../mongoModels") ();


const hostMongo = "127.0.0.212";
mongoose. connect ("mongodb://" + hostMongo + ":27017/data", { "useNewUrlParser": true, "useFindAndModify": false, "useUnifiedTopology": true });




module. exports = () => model;
