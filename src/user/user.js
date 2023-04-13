export default function buildMakeUser ({ Id, Hash }) {
  return function makeUser (
    {
      id,
      createdOn,
      username,
      password,
      pubPGPKey
    } = {},
    passwordIsHashed,
    enforceNew
  ) {
    if (enforceNew || id == null) {
      id = Id.createId()
    } else if (!Id.isValidId(id)) {
      throw new Error('Invalid Id.')
    }
    
    if (enforceNew || createdOn == null) {
      createdOn = Date.now()
    }

    if (username == null) {
      throw new Error('No username supplied.')
    }
    username = username.trim()
    if (!username) {
      throw new Error('No username supplied.')
    }
    
    if (!password) {
      throw new Error('No password supplied.')
    }
    if (!passwordIsHashed) {
      // ^             Matches the start of the string
      // (?=.*\d)      Positive lookahead to match at least one digit (0-9)
      // (?=.*[a-z])   Positive lookahead to match at least one lowercase letter (a-z)
      // (?=.*[A-Z])   Positive lookahead to match at least one uppercase letter (A-Z)
      // .{8,64}       Matches any character (except line terminators) between 8 and 64 times
      // $             Matches the end of the string
      if (!/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,64}$/.test(password)) {
        throw new Error('Password must contain one digit, one lowercase character, one uppercase character and be 8-64 characters long.')
      }
      password = Hash.hashSync(password)
    }

    return Object.freeze({
      getId: () => id,
      getCreatedOn: () => createdOn,
      getUsername: () => username,
      getPassword: () => password,
      comparePassword: (plainPassword) => Hash.compareSync(plainPassword, password),
      getPubPGPKey: () => pubPGPKey
    })
  }
}