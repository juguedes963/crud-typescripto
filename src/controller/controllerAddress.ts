//criar metodo para criar e vincular o endereco a pessoa e validar se contem o id no cabecalho
import { Response, Request } from 'express'
import Address from '../schemas/Address'
import User from '../schemas/User'
class UserAddressController {

    public async getAllUsersInAdrress(request: Request, response: Response): Promise<Response> {

        const userAddress = await Address.find().populate({
            path: "user"
        });

        return response.json(userAddress)

    }
    public async createUserInAddress(request: Request, response: Response): Promise<Response> {
        try {
            const {
                street,
                city,
                state,
                zipcode,
                country
            } = request.body


            const { id } = request.headers

            if (!id) {
                throw 'nao contem dados suficiente para fazer relaciomamento de usuario e endereco no cadastro do endereco'
            }

            const isEmptyAddress = await Address.find({
                _id: id
            })

            if (isEmptyAddress.length > 0)
                throw "ja contem registrado o endereco"

            const address = await Address.create({
                _id: request.headers.id,
                street,
                city,
                state,
                zipcode,
                country,
                user: request.headers.id

            })
            const relacionadoUser = await address.populate({
                path: "user"
            });


            return response.json(relacionadoUser)

        } catch (error) {
            return response.status(403).json({
                success: false,
                error
            })
        }


    }
    
}
export default new UserAddressController()