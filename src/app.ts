import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'


import mongoose from 'mongoose'
import routes from './routes'

class Server {
    public express: express.Application

    constructor() {
        this.express = express()
        dotenv.config()
        this.database()
        this.middlewares()
        this.routes()

    }
    private middlewares(): void {
        this.express.use(express.json())
        this.express.use(cors())
    }
    private database(): void {
        mongoose.connect(`${process.env.URL_DATABASE}`)
        console.log(mongoose.modelNames())
    }
    private routes(): void {
        this.express.use(routes)
    }
}
export default new Server().express;