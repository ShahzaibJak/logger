const fs = require('fs');
const fsPromises = require('fs').promises;
const path = require('path');

const logEvent = async (msg,fileName) => {
    const dateTime = new Date().toDateString();
    const logItem = `${dateTime}:\t${msg}`;

    if(!fs.existsSync(path.join(__dirname,'..','logs'))){
        await fsPromises.mkdir(path.join(__dirname,'..','logs'));
    }

    await fsPromises.appendFile(path.join(__dirname,'..','logs',fileName),logItem);

}


const reqLogger = (req,res,next) => {
    const msg = `${req.method}: ${req.url}`;
    logEvent(msg,"requestLogs.txt");
    next();
}

const errLogger = (err,req,res,next) => {
    const msg = `${req.method}: ${req.url}\t${err.name}: ${err.message}`;
    logEvent(msg,"errorLogs.txt");
    res.status(500).send(err.message)
}

module.exports = {reqLogger,errLogger}