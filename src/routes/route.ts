import { Router } from 'express'
import healthzRouter from './healthz.route'
import notfoundRouter from './notfound.route'
import { userRouter } from './user.route'
import isAuth from '../middleware/auth'

const api = Router()
const authRoute = Router()
const publicRoute = Router()

publicRoute.use(healthzRouter)
publicRoute.use('/v1', userRouter.publicRoutes)

authRoute.use(isAuth)
authRoute.use('/v1', userRouter.authenticatedRoutes)

api.use(publicRoute)
api.use(authRoute)
api.use(notfoundRouter)

export default api
