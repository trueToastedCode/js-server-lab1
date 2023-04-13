import {
   addUser
} from '../use-cases'
import makeRegisterUser from './register-user'

const registerUser = makeRegisterUser({ addUser })

const userController = Object.freeze({
   registerUser
})

export default userController
export { registerUser }