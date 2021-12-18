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
    public async updateAddress(request: Request, response: Response): Promise<Response> {
        try {
            const { id } = request.headers
            const {
                newstreet,
                newcity,
                newstate,
                newzipcode,
                newcountry,
            } = request.body

            const address = await Address.find({
                _id: id
            })

            if (address[0]._id != id) {
                throw "id de usuario e id no cabecalho da request diferentes nao foi possivel excluir"
            }

            if (newstreet) {
                await User.findOneAndUpdate(
                    { _id: id },
                    { street: newstreet },
                    { new: true })

            }

            if (newcity) {
                await User.findOneAndUpdate(
                    { _id: id },
                    { city: newcity },
                    { new: true })

            }
            if (newstate) {
                await User.findOneAndUpdate(
                    { _id: id },
                    { state: newstate },
                    { new: true })

            }
            if (newzipcode) {
                await User.findOneAndUpdate(
                    { _id: id },
                    { zipcode: newzipcode },
                    { new: true })

            }
            if (newcountry) {
                await User.findOneAndUpdate(
                    { _id: id },
                    { country: newcountry },
                    { new: true })
            }

            const address_update = await Address.find({
                _id: id
            }).populate({
                path: "user"
            })
            
            return response.status(200).json({
                success: true,
                data: address_update
            })
        } catch (error) {
            return response.status(403).json({
                success: false,
                error
            })
        }
    }
}
export default new UserAddressController()