import { Schema, model, Document } from 'mongoose'

import { UserInterface } from '../interfaces/interfaces'


const UserSchema = new Schema({
    name: String,
    phone: String,
    email: String,
}, {
    timestamps: true
})
export default model<UserInterface>('User', UserSchema)