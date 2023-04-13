import Id from '../Id'
import Hash from '../Hash'
import buildMakeUser from './user'

const makerUser = buildMakeUser({ Id, Hash })

export default makerUser