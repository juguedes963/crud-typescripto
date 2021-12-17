import { Document, Schema } from 'mongoose'

export interface AddressUserInterface extends Document {
    street?: String,
    city?: String,
    state?: String,
    zipcode?: Number,
    country?: String,
    user?: UserInterface
}

export interface UserInterface extends Document {
    name?: String,
    phone?: String,
    email?: String,
}
