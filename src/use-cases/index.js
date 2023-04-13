import makeAddUser from './add-user'
import userDb from '../data-access'

const addUser = makeAddUser({ userDb })

const userService = Object.freeze({
  addUser
})

export default userService
export { addUser }