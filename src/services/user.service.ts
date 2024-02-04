import { userModel, users } from '../db/models/users.model'
import bcrypt from 'bcrypt'
import logger from '../util/logger'
import {
  userResValidator,
  userPostRequest,
  userPutRequest,
  userResponse,
} from '../validators/users'

const getAuth = async (username: string, password: string) => {
  const user = await users.findOne({
    where: {
      username,
    },
    attributes: ['username', 'password'],
  })

  if (user === null) {
    return null
  }

  const isPasswordValid = await bcrypt.compare(password, user.password)

  if (isPasswordValid) {
    return user.username
  }

  return null
}

const createUser = async (data: userPostRequest): Promise<userResponse> => {
  try {
    const newUser = await users.create(data)

    return userResValidator.parse(newUser)
  } catch (error) {
    logger.error(`createUser: ${error}`)
    throw new Error('Error creating user')
  }
}

const getUser = async (username: string): Promise<userResponse> => {
  try {
    const user = await users.findOne({
      where: {
        username,
      },
      attributes: [
        'id',
        'first_name',
        'last_name',
        'username',
        'account_created',
        'account_updated',
      ],
    })

    if (!user) {
      logger.error('User not found')
      throw new Error('User not found')
    }

    return userResValidator.parse(user)
  } catch (error) {
    logger.error(`getUser: ${error}`)
    throw new Error('Error getting user')
  }
}

const updateUser = async (
  data: userPutRequest,
  username: string
): Promise<void> => {
  try {
    const user = await users.findOne({
      where: {
        username,
      },
    })

    if (!user) {
      logger.error('User not found')
      throw new Error('User not found')
    }

    await user.update({
      first_name: data.first_name,
      last_name: data.last_name,
      password: data.password,
      account_updated: new Date(),
    })
  } catch (error) {
    logger.error(`updateUser: ${error}`)
    throw new Error('Error updating user')
  }
}

export const userService = {
  getAuth,
  createUser,
  getUser,
  updateUser,
}
