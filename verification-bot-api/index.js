"use strict";


//initialize
require ("./.env")();


const log = `[BOT][SYSTEM] - - [${__dirname.slice(49)}]`;
const nodeEnv = global.process.env.NODE_ENV;


const Telegraf = require("telegraf");
const tgSession = require('telegraf/session');
//const telegrafSessionRedis = require("telegraf-session-redis");
const mongoose = require("mongoose");
const winston = require("winston");
const Redis = require("ioredis");


const configs = require("./configs");
const handler = require("./handler");
const mongoModels = require("./mongoModels");
const routes = require("./routes");
const listAnswer = require("./listAnswer");
const session = require("./session");
const stages = require("./stages");


global.configs = configs();
global.handler = handler();
global.mongoModels = mongoModels;
global.routes = routes();
global.listAnswer = listAnswer();
global.session = session();
global.winston = winston; 

global.winston.configure(global.configs.winston());

global.redis = new Redis(global.configs.redis()[0].to());
//const session = new telegrafSessionRedis(global.configs.session());


const bot = new Telegraf(global.process.env.tokenParkinsonBot);


//winston.info(`${log} - - ${Telegraf.log}`);

if (nodeEnv === "development") {
  //bot.use(Telegraf.log());
//  bot. use ((ctx, next) => { /*for (let i in ctx)*/ console. log (Object (ctx)); next ();});
}


bot.catch((err) => console.log(err));


bot.use(tgSession());

stages(bot);

bot.use((ctx, next) => {
  ctx.sessionKey = ctx.from && ctx.chat && `${ctx.from.id}:${ctx.chat.id}`;
  next();
});

bot.use((ctx, next) => global.routes.slash(ctx, next));

bot.use((ctx, next) => ctx.from.is_bot ? winston.info(`${log} - - Бот не пропущен.`) : next());


bot.start((ctx) => global.routes.start(ctx));

bot.help((ctx) => global.routes.help(ctx));

bot.command('authorization', (ctx) => ctx.scene.enter('authorization'));

bot.startPolling();


mongoose.connect(global.configs.mongo(), { "useNewUrlParser": true, "useFindAndModify": false, "useUnifiedTopology": true });
mongoose.connection.on("open", (err) => {

  if (err) {
    console.log(err);
    return;
  }


  bot.launch();
  winston.info(`${log} - - Соединение с бд и старт бота выполнены`);

});
