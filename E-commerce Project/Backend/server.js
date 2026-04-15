import express from 'express'
import dotenv from 'dotenv/config'
import connectDB from './config/DB.js'
import mongoose from 'mongoose'
import userRoutes from './routes/userRoutes.js'

const app = express()

const port = process.env.PORT || 4000

connectDB()
app.use(express.json());
app.use(express.urlencoded({ extended: true }))


app.use('/api/v1/user',userRoutes)


app.get('/', (req, res) => res.send('Hello World!'))
app.listen(port, () => console.log(`Example app listening on port ${port}!`))