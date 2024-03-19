import winston from 'winston'
const { combine, timestamp, json } = winston.format

const logger = winston.createLogger({
  format: combine(timestamp(), json()),
})

if (process.env.NODE_ENV === 'production') {
  logger.add(
    new winston.transports.File({
      filename: '/var/log/webapp/webapp.log',
      level: 'info',
    })
  )
} else {
  logger.add(
    new winston.transports.Console({
      level: 'debug',
    })
  )
}

export default logger
