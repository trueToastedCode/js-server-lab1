import amqp from 'amqplib/callback_api'
import EventEmitter from 'events'
import Id from '../Id'
import timeout from '../timeout'
import makeMakeApiAccess from './make-access'
import makeUser from '../user-entity'
import makeUserApi from './ms-user-api'

const makeApiAccess = makeMakeApiAccess({ amqp, EventEmitter, Id, timeout })
const userApi = makeUserApi({ makeApiAccess, makeUser })

const apiAccess = Object.freeze({ userApi })
export default apiAccess
export { userApi }