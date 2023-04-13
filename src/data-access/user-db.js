export default function makeUserDb({ makeDb }) {
  return Object.freeze({
    findByUsername,
    insert
  })
  async function findByUsername (username) {
    const db = await makeDb()
    const result = await db
      .collection('users')
      .findOne({ username })
    if (!result) return null
    const { _id: id, ...info } = result
    return { id, ...info }
  }
  async function insert ({ id: _id, ...info }) {
    const db = await makeDb()
    const result = await db
      .collection('users')
      .insertOne({ _id, ...info })
    return { id: result.insertedId, ...info }
  }
}