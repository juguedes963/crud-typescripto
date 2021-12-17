import express from 'express'
import cors from 'cors'
import mongoose from 'mongoose'
import routes from './routes'

class Server {
    public express: express.Application

    constructor() {
        this.express = express()

        this.database()
        this.middlewares()
        this.routes()

    }
    private middlewares(): void {
        this.express.use(express.json())
        this.express.use(cors())
    }
    private database(): void {
        mongoose.connect('mongodb+srv://julio:cavalo01@cluster0.d9dv5.mongodb.net/grm')
        console.log(mongoose.modelNames())
    }
    private routes(): void {
        this.express.use(routes)
    }
}
export default new Server().express;