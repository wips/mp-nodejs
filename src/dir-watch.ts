import DirWatcher from './services/DirWatcher';
import * as winston from 'winston';
import Importer from "./services/Importer";
import isEnvironmentSuitableForTheApp from "./services/isEnvironmentSuitableForTheApp";

const appConfig = require('../config/app.json');

winston.configure({
    level: process.env.LOG_LEVEL || appConfig.logLevel,
    transports: [new winston.transports.Console({colorize: true})]
});

if (!isEnvironmentSuitableForTheApp()) {
    winston.error('The environment doesn\'t support all features needed.');
    winston.error('Please check your NodeJs version is 8+');
    winston.error('Shutting down the app...');
    process.exit(1);
}

winston.info(`${appConfig.name} has started. NodeJS version is: ${process.version}`);
winston.info(`CWD: ${process.cwd()}`);

const watcher: IDirWatcher = new DirWatcher();
watcher.watch(appConfig.dirToWatch, 13);

new Importer();
