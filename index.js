export default function makeUserApi ({ makeApiAccess, makeUser }) {
  const sendRPCMessage = makeApiAccess({
    url: process.env.MS_USER_API_URL,
    rpcQueue: process.env.MS_USER_API_RPC_QUEUE,
    replyQueue: process.env.MS_USER_API_REPLY_QUEUE
  })

  return Object.freeze({
    registerUser
  })

  /**
   * Register a user
   * 
   * @param {object} info - User info: username, password
   * @returns {object} User entity
  */
  async function registerUser (info) {
    let result = await sendRPCMessage({
      message: `registerUser${JSON.stringify(info)}`
    })
    result = proccessResult(result)
    return makeUser(
      result.body.user,
      true, false, true
    )
  }

  function proccessResult (result) {
    if (!result) {
      throw new Error(`Result doesn't exist.`)
    }
    result = JSON.parse(result)
    if (result.statusCode !== 200) {
      throw new Error(result.body.error)
    }
    return result
  }
}