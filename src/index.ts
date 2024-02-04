import express from 'express'
import router from './routes/route'
import { initDB } from './db'

const app = express()

initDB()
app.use(express.json())
app.use(router)

export default app
