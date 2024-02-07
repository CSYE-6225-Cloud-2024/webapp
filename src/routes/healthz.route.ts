import { Router } from 'express'
import logger from '../util/logger'
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
      res.send()
    }
  )
  .head((req, res) => {
    logger.warn(`/healthz: invalid request method ${req.method}`)
    res.status(405).send()
  })
  .all((req, res) => {
    logger.warn(`/healthz: invalid request method ${req.method}`)
    res.status(405).send()
  })

export default healthzRouter
