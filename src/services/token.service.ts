import { tokens } from '../db/models/tokens.model'
import { tokenDataType, tokenValidator } from '../validators/token'

const getToken = async (token: string): Promise<tokenDataType> => {
  try {
    const data = await tokens.findOne({
      where: {
        token,
      },
    })

    if (!data) {
      throw new Error('Token not found')
    }
    const tokenData = tokenValidator.parse(data)
    return tokenData
  } catch (error) {
    throw new Error(`getToken: ${error}`)
  }
}

export const tokenService = {
  getToken,
}
