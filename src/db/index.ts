import logger from '../util/logger'
import user from './models/users.model'

const modelInits = [user]

export const initDB = async () => {
  for (const modelInit of modelInits) {
    modelInit()
  }
}
