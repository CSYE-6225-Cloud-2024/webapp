import app from '.'
import dotenv from 'dotenv'
import logger from './util/logger'

dotenv.config()
const PORT = process.env.PORT || 8080

app.listen(PORT, () => {
  logger.info(`Server started on port ${PORT}`)
})
