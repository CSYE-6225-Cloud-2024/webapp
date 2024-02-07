import { db } from '../util/db'
import logger from '../util/logger'

export const initDB = () => {
  db.authenticate()
    .then(async () => {
      logger.info('Connection has been established successfully.')
      await db.sync()
    })
    .catch((err) => {
      logger.error(`Unable to connect to the database: ${err}`)
      setTimeout(initDB, 5000)
    })
}
