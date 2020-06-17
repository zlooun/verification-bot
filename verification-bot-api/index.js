"use strict";


//initialize
require ("./.env")()();


const nodeEnv = global.process.env.NODE_ENV;


const Telegraf = require("telegraf");
const telegrafSessionRedis = require("telegraf-session-redis");
const mongoose = require("mongoose");


const configs = require("./configs")();
const handler = require("./handler")();
const mongoModels = require("./mongoModels");
const routes = require("./routes")();
const listAnswer = require("./listAnswer")();


global.configs = configs();
global.handler = handler();
global.mongoModels = mongoModels();
global.routes = routes();
global.listAnswer = listAnswer();



const session = new telegrafSessionRedis(global.configs.session());


const bot = new Telegraf(global.process.env.tokenParkinsonBot);




if (nodeEnv === "development") {

  bot. use (Telegraf. log ());
//  bot. use ((ctx, next) => { /*for (let i in ctx)*/ console. log (Object (ctx)); next ();});
}


bot.use(session);


bot.catch((err, ctx) => {
  console. log (err);
//  console. log (ctx);
});


bot.use((ctx, next) => {

  global.routes.slash(ctx, next);


  if (!ctx.from.is_bot) {
    return;
  }

  return;
});


bot.start((ctx) => {
  console.log(ctx.session);
  console.log(ctx.updateType);
  global.routes.start(ctx);
//  console. log (ctx. updateSubTypes);
//  console. log (ctx. from);
//  console. log (ctx. chat);
//  ctx. getChat (). then ( res => console. log (res));


//  for (let i in ctx) console. log (i);
});


bot.help((ctx) => {
  global.routes.help(ctx);
  return;
});


bot.settings((ctx) => {
  global.routes.settings(ctx);
  return;
});


bot.command("info", (ctx) => {
  global.routes.info(ctx);
  return;
});


bot.command("challenge", (ctx) => {
  global.routes.challenge(ctx);
  return;
});


mongoose.connect(global.configs.mongo(), { "useNewUrlParser": true, "useFindAndModify": false, "useUnifiedTopology": true });
mongoose.connection.on("open", (err) => {

  if (err) {
    console.log(err);
    return;
  }


  bot.launch();
  console.log("Connect to db and start bot success");
  return;
});
