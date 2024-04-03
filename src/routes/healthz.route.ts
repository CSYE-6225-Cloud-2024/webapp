import { Router } from 'express'
import { request } from '../middleware/request'
import { checkDBConection } from '../middleware/connection'

const healthzRouter = Router()

healthzRouter.use((_, res, next) => {
  res.setHeader('cache-control', 'no-cache, no-store, must-revalidate')
  next()
})

healthzRouter
  .route('/healthz')
  .get(
    request.noBodyAllowed,
    request.noQueryAllowed,
    checkDBConection,
    async (req, res) => {
      res.json()
    }
  )
  .head((req, res) => {
    res.status(405).json()
  })
  .all((req, res) => {
    res.status(405).json()
  })

export default healthzRouter
