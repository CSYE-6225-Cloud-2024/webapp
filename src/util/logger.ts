import winston from 'winston'
const { combine, timestamp, json } = winston.format

const levels = {
  error: 0,
  warn: 1,
  info: 2,
  debug: 3,
  http: 4,
  silly: 5,
}

const logger = winston.createLogger({
  levels: levels,
  format: combine(timestamp(), json()),
})

if (process.env.NODE_ENV === 'production') {
  logger.add(
    new winston.transports.File({
      filename: '/var/log/webapp/webapp.log',
      level: 'debug',
    })
  )
} else {
  logger.add(
    new winston.transports.Console({
      level: 'http',
    })
  )
}

export default logger
