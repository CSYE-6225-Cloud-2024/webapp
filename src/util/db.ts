import { Sequelize } from 'sequelize'
import dotenv from 'dotenv'

dotenv.config()
const db_url = process.env.DATABASE_URL || ''

export const db = new Sequelize(db_url)
