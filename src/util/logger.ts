import winston from 'winston'
const { combine, timestamp, colorize, align } = winston.format

const logFormat = winston.format.printf(({ level, message, timestamp }) => {
  return `${timestamp} [${level}]: ${message}`
})

const logger = winston.createLogger({
  level: 'info',
  format: combine(
    timestamp({ format: 'YYYY-MM-DD HH:mm:ss A' }),
    colorize({
      level: true,
      message: true,
    }),
    align(),
    logFormat
  ),
  transports: [new winston.transports.Console()],
})

export default logger
