"use strict";


//initialize
require ("./.env")();


const log = `[BOT][SYSTEM] - - [${__dirname.slice(49)}]`;
const nodeEnv = global.process.env.NODE_ENV;


const Telegraf = require("telegraf");
const Telegram = require("telegraf/telegram");
const tgSession = require('telegraf/session');
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
const subscribe = require("./subscribe");

const telegram = new Telegram(global.process.env.tokenVerificationBot);
const bot = new Telegraf(global.process.env.tokenVerificationBot);


global.configs = configs();
global.handler = handler();
global.mongoModels = mongoModels;
global.routes = routes();
global.listAnswer = listAnswer();
global.session = session();
global.winston = winston;
global.telegram = telegram;

global.winston.configure(global.configs.winston());

global.redis = new Redis(global.configs.redis()[0].to());
const sub = new Redis(global.configs.redis()[0].to());

sub.subscribe("notification", (err, count) => {

  if (err) {
    console.log(err);
    return;
  }

  sub.on("message", subscribe.notification);

});

//winston.info(`${log} - - ${Telegraf.log}`);

/* if (nodeEnv === "development") {
  bot.use(Telegraf.log());
} */


bot.catch((err) => console.log(err));


bot.use(tgSession());

bot.use((ctx, next) => {
  ctx.sessionKey = ctx.from && ctx.chat && `${ctx.from.id}:${ctx.chat.id}`;
  next();
});

stages(bot);

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

  global.handler.setAuthenticated();

  bot.launch();
  winston.info(`${log} - - Соединение с бд и старт бота выполнены`);

});
