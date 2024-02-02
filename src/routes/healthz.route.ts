import { Router } from 'express'
import { db } from '../util/db'
import logger from '../util/logger'

const healthzRouter = Router()

healthzRouter.use((_, res, next) => {
  res.setHeader('cache-control', 'no-cache, no-store, must-revalidate')
  next()
})

healthzRouter
  .route('/')
  .get(async (req, res) => {
    const contentType =
      req.headers['content-type']?.toLowerCase() || 'application/json'

    if (
      contentType !== 'application/json' ||
      'content-length' in req.headers ||
      Object.keys(req.query).length > 0
    ) {
      res.status(400).send()
      logger.warn(
        'healthz: request body or query params is not allowed for this endpoint'
      )
      return
    }

    db.authenticate()
      .then(() => {
        logger.info('healthz: database connection successful')
        res.status(200).send()
      })
      .catch((err) => {
        logger.error(`healthz: ${err} - database connection failed`)
        res.status(503).send()
      })
  })
  .head((_, res) => {
    res.status(405).send()
  })
  .all((req, res) => {
    logger.error(`healthz: invalid request method ${req.method}`)
    res.status(405).send()
  })

export default healthzRouter
