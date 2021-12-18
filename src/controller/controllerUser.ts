import { Response, Request } from 'express'
import User from '../schemas/User'
import Address from '../schemas/Address'
//implementar metodos para atualizar email e telofone e excluir usuario quando conter o id dele 

class UserController {

    public async getAllUsers(request: Request, response: Response): Promise<Response> {
        try {
            const users = await User.find()
            return response.status(200).json(users)

        } catch (error) {

            return response.status(403).json({
                success: false,
                error
            })

        }


    }
    public async createUser(request: Request, response: Response): Promise<Response> {
        try {
            const {
                email,
                name,
                phone
            } = request.body

            if (!email || !name || !phone) {

                throw 'sem dados para fazer o cadastro'

            }

            const isVerifyUser = await User.find({
                email
            })

            const isVerifyPhone = await User.find({
                phone
            })

            if (isVerifyUser.length > 0 || isVerifyPhone.length > 0) {

                throw 'ja contem usuario cadastrado com esse email ou esse telefone'

            }
            const user = await User.create({
                name,
                phone,
                email
            })


            return response.status(200).json({

                success: true,
                data: user

            })
        } catch (error) {

            response.status(403).json({

                success: false,
                error

            })

        }


    }
    public async removeUser(request: Request, response: Response): Promise<Response> {
        try {

            const {
                email
            } = request.body

            const {
                id
            } = request.headers

            if (!id) {
                throw "nao contem o id para poder excluir o usuario"
            }

            const user = await User.find({
                email
            })

            var nameRemovedUser = user[0].name

            if (user[0]._id != id) {
                throw "id de usuario e id no cabecalho da request diferentes nao foi possivel excluir"
            }

            const removedUser = await User.findOneAndDelete({
                _id: id
            })

            if (removedUser)
                await Address.findOneAndDelete({ _id: id })

            response.json({
                success: true,
                data: {
                    removedUser,
                    nameRemovedUser
                }
            })
        } catch (error) {

            return response.status(403).json({
                success: false,
                error
            })

        }
    }
    public async updateInfoUserEmail(request: Request, response: Response): Promise<Response>{
        try {
            const { email, phone } = request.body
            const { id } = request.headers


            if (!email && !phone)
                throw "nao contem nenhuma informacao no corpo da request para atualizar"

            const user_verificated = await User.find({
                phone
            })

            if (user_verificated[0]._id != id) {
                throw "id de usuario e id no cabecalho da request diferentes nao foi possivel excluir"
            }

            const user_update = await User.findOneAndUpdate(
                { _id: id }, 
                { email },
                 { new: true })

            return response.status(200).json({
                success: true,
                data: user_update
            })
        } catch (error) {
            return response.status(403).json({
                success: false,
                error
            })
        }
    }
    public async updateInfoUserPhone(request: Request, response: Response): Promise<Response> {
        try {
            const { email, phone } = request.body
            const { id } = request.headers


            if (!email && !phone)
                throw "nao contem nenhuma informacao no corpo da request para atualizar"

            const user_verificated = await User.find({
                email
            })

            if (user_verificated[0]._id != id) {
                throw "id de usuario e id no cabecalho da request diferentes nao foi possivel excluir"
            }

            const user_update = await User.findOneAndUpdate(
                { _id: id }, 
                { phone },
                 { new: true })

            return response.status(200).json({
                success: true,
                data: user_update
            })
        } catch (error) {
            return response.status(403).json({
                success: false,
                error
            })
        }
    }
}
export default new UserController()