"use strict";




require("./.env")();


const app = require('express')();
const mongoose = require('mongoose');
const Redis = require('ioredis');
const bodyParser = require('body-parser');
const winston = require("winston");
const path = require("path");
global.path = path;

const mongoModels = require('./mongoModels');
const configs = require('./configs');
const routes = require('./routes');
const handler = require('./handler');
const subscribe = require("./subscribe");


global.configs = configs();
global.mongoModels = mongoModels;
global.winston = winston;
global.handler = handler();

global.redis = new Redis(global.configs.connectInternal().redis()[0].to());
const sub = new Redis(global.configs.connectInternal().redis()[0].to());

global.winston.configure(global.configs.winston());
global.handler.setIntervalForWinstonsConfigs();


const dirname = path.relative(process.cwd(), __dirname);
const log = `[EXPRESS][SYSTEM] - - [${dirname}] - -`;


sub.subscribe("recipient", (err) => {

  if (err) {
    winston.error(`${log} - - ${err}`);
    return;
  }

  sub.on("message", subscribe);

});


mongoose.connect(global.configs.connectInternal().mongo()[0].to(), { "useNewUrlParser": true, "useFindAndModify": false, "useUnifiedTopology": true });




app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());




app.use("/", routes);


mongoose.connection.on("open", (err) => {

  if (err) {
    winston.error(`${log} ${err}`);
    return;
  }

  app.listen(global.configs.express().port, () => winston.info(`${log} start on port ${global.configs.express().port}`));
  return;
  
});