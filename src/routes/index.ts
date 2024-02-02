import { Router } from 'express'
import healthzRouter from './healthz.route'
import notfoundRouter from './notfound.route'

const apiRouter = Router()

apiRouter.use('/healthz', healthzRouter)
apiRouter.use('/', notfoundRouter)

export default apiRouter
