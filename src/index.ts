import express from 'express'
import router from './routes/route'
import { initDB } from './db'
import { httpLogger } from './middleware/httplogger'

const app = express()

initDB()
app.use(express.json())
app.use(httpLogger)
app.use(router)

export default app
