import { Schema, model } from 'mongoose'
import { AddressUserInterface } from '../interfaces/interfaces'


const AddressUserSchema = new Schema({
    street: String,
    city: String,
    state: String,
    zipcode: Number,
    country: String,
    user: { type: Schema.Types.ObjectId, ref: "User", required: true }
}, {
    timestamps: true
})

export default model<AddressUserInterface>('Address', AddressUserSchema)