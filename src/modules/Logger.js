const chalk = require('chalk');
const moment = require('moment');

class Logger {
    static log(content, type = "log") {
        const time = `[${moment().format("MM-DD-YYYY HH:mm")}]`;
        switch (type) {
            case "log":
                {
                    return console.log(`${time} ${chalk.bgBlue(type.toUpperCase())} ${content}`)
                }
            case "warn":
                {
                    return console.log(`${time} ${chalk.bgYellow(type.toUpperCase())} ${content}`)
                }
            case "error":
                {
                    return console.log(`${time} ${chalk.bgRed(type.toUpperCase())} ${content}`)
                }
            case "debug":
                {
                    return console.log(`${time} ${chalk.green(type.toUpperCase())} ${content}`)
                }
            case "ready":
                {
                    return console.log(`${time} ${chalk.bgGreen(type.toUpperCase())} ${content}`)
                }
            case "sucess":
                {
                    return console.log(`${time} ${chalk.bgGreen(type.toUpperCase())} ${content}`)
                }
            default:
                throw new TypeError(`Logger type must be specified [log, warn, error, debug, ready, success]`)
        }
    }
    static error(content) {
        return this.log(content, "error")
    }
    static warn(content) {
        return this.log(content, "warn")
    }
    static debug(content) {
        return this.log(content, "debug")
    }
}

module.exports = Logger;