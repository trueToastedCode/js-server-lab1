import makeUserDb from './user-db'
import { MongoClient } from 'mongodb'

const url = process.env.USER_DB_URL
const dbName = process.env.USER_DB_NAME
const client = new MongoClient(url, { useNewUrlParser: true })

export async function makeDb() {
  if (!client.isConnected) {
      await client.connect()
  }
  return client.db(dbName)
}

const userDb = makeUserDb({ makeDb })
export default userDb