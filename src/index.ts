import express from 'express'
import apiRouter from './routes/index'
import { initDB } from './db'

const app = express()

app.use(express.json())
app.use(apiRouter)
initDB()

export default app
