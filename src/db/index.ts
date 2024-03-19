import { db } from '../util/db'
import logger from '../util/logger'

export const initDB = async () => {
  try {
    await db.sync()
    logger.info({
      message: 'Database connected',
    })
  } catch (err) {
    logger.error({
      message: 'Unable to connect to the database',
      error: `${err}`,
    })
    setTimeout(initDB, 5000)
  }
}
