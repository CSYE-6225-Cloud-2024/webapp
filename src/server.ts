import app from '.'
import dotenv from 'dotenv'
import logger from './util/logger'

// Load environment variables from .env file
const envPath =
  process.env.NODE_ENV !== 'production'
    ? `.env.${process.env.NODE_ENV}`
    : '.env'
dotenv.config({ path: envPath })
const PORT = process.env.PORT || 8080

app.listen(PORT, () => {
  logger.info(`Server started on port ${PORT}`)
})
