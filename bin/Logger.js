'use strict';

const config = require('config');
const appRoot = require('app-root-path');
const winston = require('winston');
const tsFormat = () => '[' + new Date() + ']';

module.exports = winston.createLogger({
  level: config.get('settings.LOG_LEVEL'),
    transports: [
      new (winston.transports.Console)({
        timestamp: tsFormat,
        colorize: true,
        json: false,
        level: process.env.NODE_ENV !== 'production' ? 'debug' : 'info'
      }),
      new (winston.transports.File)({
        name: 'file#info',
        filename: `${config.get('settings.LOG_DIR')}/${config.get('settings.APP_NAME')}.log`,
        timestamp: tsFormat,
        json: true,
        level: 'info'
      }),
      new (winston.transports.File)({
        name: 'file#debug',
        filename: `${config.get('settings.LOG_DIR')}/${config.get('settings.APP_NAME')}.log`,
        timestamp: tsFormat,
        json: true,
        level: process.env.NODE_ENV != 'production'  ? 'debug' : 'silly'
      }),
      new (winston.transports.File)({
        name: 'file#error',
        filename: `${config.get('settings.LOG_DIR')}/${config.get('settings.APP_NAME')}.log`,
        timestamp: tsFormat,
        json: true,
        level: 'error'
      })
    ],
});
