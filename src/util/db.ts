import { Sequelize } from 'sequelize'
import dotenv from 'dotenv'
import logger from './logger'

dotenv.config({ path: `.env.${process.env.NODE_ENV}` })
const db_host = process.env.DB_HOST || 'localhost'
const db_port = process.env.DB_PORT || '5432'
const db_user = process.env.DB_USER || ''
const db_password = process.env.DB_PASSWORD || ''
const db_name = process.env.DB_NAME || ''
const db_url = `postgres://${db_user}:${db_password}@${db_host}:${db_port}/${db_name}`

export const db: Sequelize = new Sequelize(db_url, {
  dialect: 'postgres',
  logging: (msg) => logger.info(msg),
})
