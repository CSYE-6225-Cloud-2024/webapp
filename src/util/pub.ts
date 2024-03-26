import { PubSub } from '@google-cloud/pubsub'
import logger from './logger'

const pubsub = new PubSub()
const topicName = 'verify_email'

export const publishMessage = async (data: string) => {
  const dataBuffer = Buffer.from(data)
  try {
    const messageId = await pubsub
      .topic(topicName)
      .publishMessage({ data: dataBuffer })
    logger.info(`Message with ID ${messageId} published.`)
  } catch (error) {
    logger.error(`Error publishing message: ${error}`)
  }
}


