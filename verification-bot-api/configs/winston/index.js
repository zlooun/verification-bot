"use strict";




const handler = () => {

	return {

		transports: [
			new (global.winston.transports.File)({ 
				filename: "../logs/log_" + date() + ".txt",
				"format": winston.format.combine( 
					winston.format.timestamp(),
					winston.format.printf(
						(log) => `${log.message.slice(0, log.message.indexOf("- -") + 3)} [${log.timestamp}] ${log.message.slice(log.message.indexOf("- -") + 4)}`
					)
				) 
			}),
			new (global.winston.transports.Console)({ "format": winston.format.printf((log) => log.message) }),
		]

	};

};




module.exports = handler;




function date() {

  date = new Date();

	let dd = date.getDate();
	if (dd < 10) dd = '0' + dd;

	let mm = date.getMonth() + 1;
	if (mm < 10) mm = '0' + mm;

	let yy = date.getFullYear() % 100;
	if (yy < 10) yy = '0' + yy;

	return dd + '.' + mm + '.' + yy;
}