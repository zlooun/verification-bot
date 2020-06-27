"use strict";




const handler = (channel, message) => {

  if (channel === "notification") {

    message = JSON.parse(message);

    const newMessage = `Имя: ${message.name}\n`+
    `Фамилия: ${message.lastname ? message.lastname : "отсутствует"}\n` +
    `Логин: ${message.login}`;

    global.telegram.sendMessage("376893421", newMessage);

  }
    
};




module.exports = handler;
