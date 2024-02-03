import { Sequelize } from 'sequelize'
import dotenv from 'dotenv'
import userInit from '../db/models/users.model'

dotenv.config()
const db_url = process.env.DATABASE_URL || ''

export const db: Sequelize = new Sequelize(db_url, {
  logging: console.log,
})
