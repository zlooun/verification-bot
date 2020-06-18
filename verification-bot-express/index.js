"use strict";




const log = `[EXPRESS][SYSTEM] - - [${__dirname.slice(49)}]`;

const app = require('express')();
const mongoose = require('mongoose');
const Redis = require('ioredis');
const bodyParser = require('body-parser');
const winston = require("winston");


//const mongoModels = require('./mongoModels');
const configs = require('./configs')();
const routes = require('./routes');


//global.listStatus = listStatus();
global.configs = configs();
//global.mongoModels = mongoModels();
global.winston = winston; 

global.redis = new Redis(global.configs.connectInternal().redis()[0].to());
global.winston.configure(global.configs.winston());



mongoose.connect(global.configs.connectInternal().mongo()[0].to(), { "useNewUrlParser": true, "useFindAndModify": false, "useUnifiedTopology": true });




app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());




app.use("/", routes());


mongoose.connection.on("open", (err) => {

  if (err) {
    console.log(err);
    return;
  }

  app.listen(global.configs.express().port, () => winston.info(`${log} - - "start on port " + global.configs.express().port)`));
  return;
  
});