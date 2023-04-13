import makeUser from '../user-entity'

export default function makeAddUser ({ userDb }) {
  return async function addUser (args) {
    const user = makeUser(args)
    return userDb.insert({
      id: user.getId(),
      createdOn: user.getCreatedOn(),
      username: user.getUsername(),
      password: user.getPassword(),
      pubPGPKey: user.getPubPGPKey()
    })
  }
}