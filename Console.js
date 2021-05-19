const chalk = require("chalk");

function log(code, content) {
    if (isNaN(parseInt(code))) { content = code; code = 0; }
    let state = "";
    switch (code) {
        case -1:
            state = chalk.rgb(200, 200, 200)("Debug");
            break;
        case 0:
            state = chalk.rgb(0, 255, 0)("Info");
            break;
        case 1:
            state = chalk.rgb(255, 255, 0)("Warn");
            break;
        case 2:
            state = chalk.rgb(255, 127, 0)("Error");
            break;
        case 3:
            state = chalk.rgb(255, 0, 0)("Critical");
            break;
        case 4:
            state = chalk.rgb(127, 0, 0)("Fatal");
            break;
    }
    let date = new Date(Date.now());
    let time = [date.getDate(), date.getMonth(), date.getFullYear(), date.getHours(), date.getMinutes(), date.getSeconds()];
    if (time[0] < 10) time[0] = "0" + time[0];
    if (time[1] < 10) time[1] = "0" + time[1];
    if (time[3] < 10) time[3] = "0" + time[3];
    if (time[4] < 10) time[4] = "0" + time[4];
    if (time[5] < 10) time[5] = "0" + time[5];
    time = "[" + time[0] + "/" + time[1] + "/" + time[2] + " " + time[3] + ":" + time[4] + ":" + time[5] + "]";
    if((code === -1 && ["-d", "--debug"].includes(process.argv[2])) || code !== -1) {
        console.log(chalk.rgb(255, 255, 255)(time) + " " + chalk.rgb(200, 200, 200)("[") + state + chalk.rgb(200, 200, 200)("]") + " " + chalk.rgb(255, 255, 255)(content));
    }
    if (code == 4) {
        setTimeout(() => {
            console.log(chalk.rgb(127, 0, 0)("Fatal error. Process will now terminate."));
            process.exit(1);
        });
    }
}

/**
 * Send a debug message to console.
 * Requires the "--debug" flag to be given on startup.
 * @param {String} content 
 */
console.debug = (content) => log(-1, content);
/**
 * Send an info message to console.
 * @param {String} content 
 */
console.info = (content) => log(0, content);
/**
 * Send a warn message to console.
 * @param {String} content 
 */
console.warn = (content) => log(1, content);
/**
 * Send an error message to console.
 * @param {String} content 
 */
console.error = (content) => log(2, content);
/**
 * Send a critical message to console.
 * @param {String} content 
 */
console.critical = (content) => log(3, content);
/**
 * Send a fatal message to console.
 * This will also exit the process with a non-zero error code.
 * @param {String} content 
 */
console.fatal = (content) => log(4, content);
