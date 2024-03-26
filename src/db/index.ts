import logger from '../util/logger'
import { db } from '../util/db'
import { tokens } from './models/tokens.model'
import { users } from './models/users.model'

const models = {
  users,
  tokens,
}

export const initDB = async () => {
  try {
    await db.sync()
    logger.info({
      message: 'Database connected and synced successfully',
    })
  } catch (err) {
    logger.error({
      message: 'Unable to connect to the database',
      error: `${err}`,
    })
    setTimeout(initDB, 5000)
  }
}
