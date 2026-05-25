import express from 'express';
import ioredis, { Redis } from 'ioredis';
import mongoose, { connect } from 'mongoose';

const app = express();

const redis = new Redis(process.env.REDIS_URL || 'redis://localhost:6379');

app.get('/redis',async (req,res)=>{
    const reply = await redis.ping();
    res.json({Redis:reply})
})

app.get('/mongo',async(req,res)=>{
    const url = (process.env.MONGO_URL  || 'mongodb://localhost:27017/Redis_DB');

    if(mongoose.connection.readyState===0){
        await mongoose.connect(url)

    }
    res.json({mongo:"Connected",database:mongoose.connection.name})
})

app.listen(3000,()=>{
    console.log('***********************************');
    console.log("server is running on port 3000");
    console.log('***********************************');
})