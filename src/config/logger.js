import * as winston from 'winston';
import 'winston-daily-rotate-file';
import { Loggly } from 'winston-loggly-bulk';

const {
  timestamp,
  printf,
  cli,
  combine,
  colorize,
  errors,
} = winston.format;

const { createLogger } = winston;

const format = cli({
  colors: {
    info: 'blue',
    error: 'red',
    warn: 'yellow',
    http: 'magenta',
    debug: 'green',
  },
});

const timezone = () => new Date().toLocaleString('en-GB', {
  timeZone: 'Africa/Lagos',
});

const level = () => (process.env.NODE_ENV === 'development' ? 'debug' : 'info');

const levels = {
  error: 0,
  warn: 1,
  info: 2,
  http: 3,
  verbose: 4,
  debug: 5,
  silly: 6,
};

const options = {
  levels,
  level: level(),
  transports: [
    new winston.transports.Console({
      level: process.env.NODE_ENV === 'production' ? 'error' : 'debug',
      format,
      handleExceptions: true,
    }),
    new winston.transports.File({
      level: 'info',
      filename: 'logs/server/all.log',
      handleExceptions: true,
      maxsize: 5242880,
    }),
    new winston.transports.File({
      level: 'error',
      filename: 'logs/server/error.log',
      handleExceptions: true,
      maxsize: 5242880,
    }),
    new winston.transports.DailyRotateFile({
      maxFiles: '14d',
      level: 'info',
      dirname: 'logs/server/daily',
      datePattern: 'YYYY-MM-DD',
      filename: '%DATE%.log',
    }),
  ],
  format: combine(
    errors({ stack: true }),
    colorize({ all: true }),
    timestamp({ format: timezone }),
    printf((info) => `${info.timestamp}:${info.level}: ${info.message}`),
  ),
};

const logger = createLogger(options);

logger.add(
  new Loggly({
    subdomain: 'me',
    token: 'f697844e-08ed-49e6-aec2-849c0d52aa99',
    tags: ['reddit-clone'],
    json: true,
  }),
);

logger.stream.write = (message) => {
  logger.info(message);
};

export default logger;
