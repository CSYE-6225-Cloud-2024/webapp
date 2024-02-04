import { Router } from 'express'
import { userController } from '../controllers/users.controller'
import logger from '../util/logger'

const publicRoutes = Router()
const authenticatedRoutes = Router()

publicRoutes
  .route('/user')
  .post(userController.createUserController)
  .all((req, res) => {
    logger.warn(`user: invalid request method ${req.method}`)
    res.status(405).send()
  })

authenticatedRoutes
  .route('/user/self')
  .get(userController.getUserController)
  .put(userController.updateUserController)
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
