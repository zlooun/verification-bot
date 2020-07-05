"use strict";




const recipient = require("./recipient");


const dirname = path.relative(process.cwd(), __dirname);


const handler = (channel, message) => {
  const log = `[EXPRESS][SYSTEM] - - [${dirname}] - -`;


  if (channel === "recipient") {
    winston.info(`${log} Subscriber получил запос "recipient".`);
    recipient(JSON.parse(message));
    return;
  }

};




module.exports = handler;
