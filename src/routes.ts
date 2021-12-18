import { Router } from 'express'
import controllerAddress from './controller/controllerAddress'
import controllerUser from './controller/controllerUser'
import path from 'path'

const routes = Router()
routes.get("/", (req, response) => {

    response.sendFile('index.html', { root: path.join(__dirname, '../public') })
})
routes.get('/user', controllerUser.getAllUsers)
routes.post('/user', controllerUser.createUser)
routes.put('/user/phone', controllerUser.updateInfoUserPhone)
routes.put('/user/email', controllerUser.updateInfoUserEmail)
routes.delete('/user', controllerUser.removeUser)

routes.get('/address', controllerAddress.getAllUsersInAdrress)
routes.post('/address', controllerAddress.createUserInAddress)
routes.put('/address', controllerAddress.updateAddress)

export default routes