import { userApi } from '../../api-access'
import makeRegisterUser from './register-user'

const registerUser = makeRegisterUser({ userApi })

const userService = Object.freeze({
  registerUser
})

export default userService
export { registerUser }