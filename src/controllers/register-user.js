export default function makeRegisterUser ({ addUser }) {
  return async function registerUser (args) {
    try {
      // delete pgp key, overwrite if supplied
      // set flag that password is hashed to false
      // set flag to create user as new to true
      const user = await addUser(
        { ...args, pubPGPKey: null },
        false, true, false
      )
      user.password = null
      return {
        statusCode: 201,
        body: { user }
      }
    } catch (e) {
      return {
        statusCode: 500,
        body: { error: e.message }
      }
    }
  }
}