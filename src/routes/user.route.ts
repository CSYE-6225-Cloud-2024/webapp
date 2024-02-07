import { Router } from 'express'
import { userController } from '../controllers/users.controller'
import logger from '../util/logger'
import { request } from '../middleware/request'
import { checkDBConection } from '../middleware/connection'

const publicRoutes = Router()
const authenticatedRoutes = Router()

publicRoutes
  .route('/user')
  .post(
    request.isValidContentType,
    request.noQueryAllowed,
    checkDBConection,
    userController.createUserController
  )
  .all((req, res) => {
    logger.warn(`user: invalid request method ${req.method}`)
    res.status(405).send()
  })

authenticatedRoutes
  .route('/user/self')
  .get(
    request.noQueryAllowed,
    request.noBodyAllowed,
    checkDBConection,
    userController.getUserController
  )
  .put(
    request.isValidContentType,
    request.noQueryAllowed,
    checkDBConection,
    userController.updateUserController
  )
  .head((req, res) => {
    logger.warn(`user/self: invalid request method ${req.method}`)
    res.status(405).send()
  })
  .all((req, res) => {
    logger.warn(`user/self: invalid request method ${req.method}`)
    res.status(405).send()
  })

export const userRouter = {
  publicRoutes,
  authenticatedRoutes,
}
