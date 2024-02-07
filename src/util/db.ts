import { Sequelize } from 'sequelize'
import dotenv from 'dotenv'
import logger from './logger'

dotenv.config()
const db_url = process.env.DATABASE_URL || ''

export const db: Sequelize = new Sequelize(db_url, {
  dialect: 'postgres',
  logging: (msg) => logger.info(msg),
})
