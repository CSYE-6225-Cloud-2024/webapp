import { Router } from 'express'
import healthzRouter from './healthz.route'
import notfoundRouter from './notfound.route'
import { userRouter } from './user.route'
import { isAuth, isVerified } from '../middleware/auth'
import { httpLogger } from '../middleware/httplogger'

const api = Router()
const authRoute = Router()
const publicRoute = Router()

publicRoute.use(healthzRouter)
publicRoute.use('/v1', httpLogger, userRouter.publicRoutes)

authRoute.use(isAuth)
if (process.env.NODE_ENV !== 'test') authRoute.use(isVerified)
authRoute.use('/v1', httpLogger, userRouter.authenticatedRoutes)

api.use(publicRoute)
api.use(authRoute)
api.use(notfoundRouter)

export default api
