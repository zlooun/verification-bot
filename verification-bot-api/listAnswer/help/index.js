"use strict";




const handler = (from, isAuthenticated) => {

  return new Promise((resolve) => {

    let str;

    if (isAuthenticated) {
      str = `${ from.first_name } ${ from.last_name }, тебе доступны следующие команды:\n
/turnOn - включить уведомления;\n
/turnOff - выключить уведомления;\n`;

    resolve(str);

    }
    
    str = `${ from.first_name } ${ from.last_name }, т.к. ты не авторизован, тебе доступны только следующие команды:\n
/help - помощь;\n
/authorization - авторизоваться;\n`;

    resolve(str);

  })

};




module.exports = handler;
