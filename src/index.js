import dotenv from 'dotenv'
import amqp from 'amqplib/callback_api'
import makeAmqpCallback from './amqp-callback'
import userController from './controllers'

dotenv.config()

console.log('Connecting server...')

amqp.connect(process.env.RABBITMQ_URL, (connectionError, connection) => {
  if (connectionError) {
    throw new Error(connectionError)
  }
  connection.createChannel((channelError, channel) => {
    if (channelError) {
      throw new Error(channelError)
    }
    channel.assertQueue(process.env.RABBITMQ_QUEUE);
    const amqpCallback = makeAmqpCallback(channel, userController)
    console.log(`Server is listening on queue ${process.env.RABBITMQ_QUEUE}.`)
    channel.consume(process.env.RABBITMQ_QUEUE, amqpCallback)
  })
})