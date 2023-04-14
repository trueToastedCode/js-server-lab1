import path from 'path'
import makeGeneralController from './user'
import userService from '../use-cases/user'

const userController = makeGeneralController({ path, userService })

const controllers = Object.freeze({ userController })
export default controllers
export { userController }