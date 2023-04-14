export default function makeUserController({ path, userService }) {
  return Object.freeze({
    signup_get,
    signup_post
  })
  function signup_get (req, res) {
    res.sendFile(path.join(__dirname, '../../public/signup.html'))
  }
  async function signup_post (req, res) {
    try {
      const user = await userService.registerUser(req.body)
      res.send(JSON.stringify({
        id: user.getId(),
        createdOn: user.getCreatedOn(),
        username: user.getUsername(),
        password: user.getPassword(),
        pubPGPKey: user.getPubPGPKey()
      }))
    } catch (e) {
      return res.send(e.message)
    }
  }
}