"use strict";


const app = require('express')();
const mongoose = require('mongoose');
const Redis = require('ioredis');
const bodyParser = require('body-parser');


//const mongoModels = require('./mongoModels');
const configs = require('./configs')();
const routes = require('./routes');


//global.listStatus = listStatus();
global.configs = configs();
//global.mongoModels = mongoModels();

global.redis = new Redis(global.configs.connectInternal().redis()[0].to());




mongoose.connect(global.configs.connectInternal().mongo()[0].to(), { "useNewUrlParser": true, "useFindAndModify": false, "useUnifiedTopology": true });




app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());




app.use("/", routes());


mongoose.connection.on("open", (err) => {

  if (err) {
    console.log(err);
    return;
  }

  app.listen(global.configs.express().port, () => console. log("start on port " + global.configs.express().port));
  return;
  
});