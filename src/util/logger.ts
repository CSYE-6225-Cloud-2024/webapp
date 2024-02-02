import winston from 'winston'
const { combine, timestamp, printf, colorize, align } = winston.format

const logger = winston.createLogger({
  level: 'info',
  format: combine(
    timestamp({ format: 'YYYY-MM-DD HH:mm:ss A' }),
    winston.format.json(),
    colorize({ all: true }),
    align()
  ),
  transports: [new winston.transports.Console()],
})

export default logger
