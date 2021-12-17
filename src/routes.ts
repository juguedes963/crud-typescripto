import { Router } from 'express'
import controllerAddress from './controller/controllerAddress'
import controllerUser from './controller/controllerUser'

const routes = Router()

routes.get('/user', controllerUser.getAllUsers)
routes.post('/user', controllerUser.createUser)
routes.delete('/user',controllerUser.removeUser)

routes.get('/address', controllerAddress.getAllUsersInAdrress)
routes.post('/address', controllerAddress.createUserInAddress)

export default routes