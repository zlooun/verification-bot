"use strict";




const handler = () => {

  setTimeout(() => setInterval(() => global.winston.configure(global.configs.winston()), 1000 * 3600 * 24), getTimeUntilNextDay());

};




module.exports = handler;




function getTimeUntilNextDay() {

  let tomorrow = new Date(+Date.now() + (24 * 3600 * 1000));

  tomorrow = new Date(tomorrow.getFullYear(), tomorrow.getMonth(), tomorrow.getDate());

  return tomorrow - Date.now();

}