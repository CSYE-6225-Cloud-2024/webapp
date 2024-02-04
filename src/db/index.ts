import { usersInit } from './models/users.model'

const modelInits = [usersInit]

export const initDB = async () => {
  for (const modelInit of modelInits) {
    modelInit()
  }
}
