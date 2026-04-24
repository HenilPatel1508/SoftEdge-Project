import express from 'express'
import dotenv from 'dotenv/config'
import connectDB from './config/DB.js'
import mongoose from 'mongoose'
import userRoutes from './routes/userRoutes.js'
import cors from 'cors'
import productRoute from './routes/productRoutes.js'
import cartRoute from './routes/cartRoutes.js'
import orderRoute from './routes/orderRoutes.js'
import invoiceRoutes from "./routes/invoiceRoutes.js";

const app = express()

const port = process.env.PORT || 4000

connectDB()
app.use(express.json());
app.use(express.urlencoded({ extended: true }))
app.use(cors({
    origin:'http://localhost:5173',
    credentials:true
}))
app.use("/uploads", express.static("uploads"));

app.use('/api/v1/user',userRoutes)
app.use('/api/v1/product',productRoute)
app.use('/api/v1/cart',cartRoute)
app.use('/api/v1/order',orderRoute)
app.use("/api/v1", invoiceRoutes);

app.get('/', (req, res) => res.send('Hello World!'))
app.listen(port, () => console.log(`Example app listening on port ${port}!`))
