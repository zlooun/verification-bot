"use strict";


//initialize
require ("./.env")();


const nodeEnv = global.process.env.NODE_ENV;


const Telegraf = require("telegraf");
const Telegram = require("telegraf/telegram");
const tgSession = require('telegraf/session');
const mongoose = require("mongoose");
const winston = require("winston");
const Redis = require("ioredis");
const path = require("path");
global.path = path;

const configs = require("./configs");
const handler = require("./handler");
const mongoModels = require("./mongoModels");
const routes = require("./routes");
const listAnswer = require("./listAnswer");
const session = require("./session");
const stage = require("./stage");
const subscribe = require("./subscribe");

const telegram = new Telegram(global.process.env.tokenVerificationBot);
const bot = new Telegraf(global.process.env.tokenVerificationBot);

const dirname = path.relative(process.cwd(), __dirname);
const log = `[BOT][SYSTEM] - - [${dirname}]`;

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

sub.subscribe("notification", (err) => {

  if (err) {
    winston.info(`${log} - - ${err}`);
    return;
  }

  sub.on("message", subscribe.notification);

});


bot.catch((err) => winston.info(`${log} - - ${err}`));


bot.use(tgSession());

bot.use((ctx, next) => {
  ctx.sessionKey = ctx.from && ctx.chat && `${ctx.from.id}:${ctx.chat.id}`;
  next();
});

bot.use(stage());

bot.start((ctx) => {
  const log = `[BOT][${ctx.from.id}] - - [${dirname}]`;
  winston.info(`${log} - - Команда /start.`);
  global.routes.start(ctx);
});

bot.use((ctx, next) => {
  const log = `[BOT][${ctx.from.id}] - - [${dirname}]`;
  winston.info(`${log} - - Router slash.`);
  global.routes.slash(ctx, next);
});

bot.use((ctx, next) => {
  const log = `[BOT][${ctx.from.id}] - - [${dirname}]`;

  ctx.from.is_bot ? winston.info(`${log} - - Бот не пропущен.`) : next();
});


bot.help((ctx) => {
  const log = `[BOT][${ctx.from.id}] - - [${dirname}]`;
  winston.info(`${log} - - Команда /help.`);
  global.routes.help(ctx);
});

bot.command('authorization', (ctx) => {
  const log = `[BOT][${ctx.from.id}] - - [${dirname}]`;
  winston.info(`${log} - - Команда /authorization.`);
  global.routes.authorization(ctx);
});

bot.command('turnOff', (ctx) => {
  const log = `[BOT][${ctx.from.id}] - - [${dirname}]`;
  winston.info(`${log} - - Команда /turnOff.`);
  global.routes.turnOff(ctx);
});

bot.command('turnOn', (ctx) => {
  const log = `[BOT][${ctx.from.id}] - - [${dirname}]`;
  winston.info(`${log} - - Команда /turnOn.`);
  global.routes.turnOn(ctx);
});

bot.hears(/^(🌚 )?Авторизоваться$/gi, (ctx) => {
  const log = `[BOT][${ctx.from.id}] - - [${dirname}]`;
  winston.info(`${log} - - Пользователь ввел "Авторизоваться".`);
  global.routes.authorization(ctx);
}); 

bot.hears(/^(👍 )?Включить уведомления$/gi, (ctx) => {
  const log = `[BOT][${ctx.from.id}] - - [${dirname}]`;
  winston.info(`${log} - - Пользователь ввел "Включить уведомления".`);
  global.routes.turnOn(ctx);
});

bot.hears(/^(👎 )?Выключить уведомления$/gi, (ctx) => {
  const log = `[BOT][${ctx.from.id}] - - [${dirname}]`;
  winston.info(`${log} - - Пользователь ввел "Выключить уведомления".`);
  global.routes.turnOff(ctx);
});

bot.hears(/^(💡 )?Помощь$/gi, (ctx) => {
  const log = `[BOT][${ctx.from.id}] - - [${dirname}]`;
  winston.info(`${log} - - Пользователь ввел "Помощь".`);
  global.routes.help(ctx);
}); 

bot.on("message", (ctx) => {
  const log = `[BOT][${ctx.from.id}] - - [${dirname}]`;
  winston.info(`${log} - - Неизвестная команда.`);
  global.routes.other(ctx);
});

bot.startPolling();


mongoose.connect(global.configs.mongo(), { "useNewUrlParser": true, "useFindAndModify": false, "useUnifiedTopology": true });
mongoose.connection.on("open", (err) => {

  if (err) {
    winston.info(`${log} - - ${err}`)
    return;
  }

  winston.info(`${log} - - Соединение с бд выполнено.`);

  winston.info(`${log} - - Прогрев кэша в redis.`);
  global.handler.setAuthenticated()
  .then(() => bot.launch().then(() => winston.info(`${log} - - Старт бота выполнен.`)), (err) => winston.info(`${log} - - ${err}`));

});