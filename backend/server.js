import express from 'express'
import cors from 'cors'
import 'dotenv/config'
import connectDB from './config/mongodb.js';
import connectCloudinary from './config/cloudinary.js';
import adminRouter from './routes/adminRoute.js';
import userRouter from './routes/userRoute.js';

const app=express();
const port=process.env.PORT||4000;
connectDB();
connectCloudinary();

//middlewares
app.use(express.json());
app.use(cors());

//api endpoints
app.use('/api/admin',adminRouter);
app.use('/api/user',userRouter);

//api endpoints 
app.get('/' ,(req,res)=>{
    res.send('Api Working');
})

app.listen(port,()=>{console.log(`server started at PORT :${port}`)})