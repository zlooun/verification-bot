"use strict";




const dirname = path.relative(process.cwd(), __dirname);


const handler = (message) => {
  const log = `[EXPRESS][SYSTEM] - - [${dirname}] - -`;

  const idRecipient = message.idRecipient;
  const idRequest = message.idRequest;

  const updateObj = {
    idRecipient
  }

  global.mongoModels.Request.findByIdAndUpdate(idRequest, updateObj, { new : true})
  .then((updatedObj) => {
    
    if (!updatedObj) {
      winston.warn(`${log} Request в бд не обновился.`);
    }

    winston.info(`${log} Request в бд обновился.`);

  }, (err) => winston.error(`${log} - - ${err}`));
    
};




module.exports = handler;
