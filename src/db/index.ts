import { db } from '../util/db'
import logger from '../util/logger'

export const initDB = async () => {
  try {
    await db.sync()
    logger.info('Database sync successfully')
  } catch (err) {
    logger.error(`Unable to connect to the database: ${err}`)
    setTimeout(initDB, 5000)
  }
}
