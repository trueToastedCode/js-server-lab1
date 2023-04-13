import dotenv from 'dotenv'
import { makeDb } from '../src/data-access'

dotenv.config()

;(async function setupDb() {
  console.log('Setting up database...')
  // database collection will automatically be created if it does not exist
  // indexes will only be added if they don't exist
  const db = await makeDb()
  const result = await db
    .collection('users')
    .createIndexes([
      { key: { username: 1 }, name: 'username_idx', unique: true }
    ])
  console.log(result)
  console.log('Database setup complete.')
  process.exit()
})()