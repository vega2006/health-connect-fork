import validator from 'validator'
import bcrypt from 'bcrypt'
import {v2 as cloudinary} from 'cloudinary'
import doctorModel from '../model/doctorModel.js';
import jwt from 'jsonwebtoken';

//api for adding doctors

const addDoctor=async(req,res)=>{
    try
    {
        const {name,email,password,speciality,degree,experience,about,fees,address}=req.body;
        const imageFile=req.file
        
        //checking for all data for putting in data
        if(!name||!email||!password||!speciality||!degree||!experience||!about||!fees||!address)
        {
            return res.json({success:false,message:"missing details"})
        }

        //validate email format
        if(!validator.isEmail(email))
        {
            return res.json({success:false,message:"please enter a valid email"})
        }

        //validating strong password
        if(password.length<8)
        {
            return res.json({success:false,message:"please enter a strong password"})
        }

        //hashing doctor password
        const salt=await bcrypt.genSalt(10)
        const hashedPassword=await bcrypt.hash(password,salt)
        
        //upload image to cloudinary
        const imageUpload=await cloudinary.uploader.upload(imageFile.path,{resource_type:'image'});
        const imageUrl=imageUpload.secure_url;
        
        const doctorData={
            name,
            email,
            image:imageUrl,
            password:hashedPassword,
            speciality,
            degree,
            experience,
            about,
            fees,
            address:JSON.parse(address),
            date:Date.now()
        }
        
        const newDoctor=new doctorModel(doctorData);
        
        await newDoctor.save();
        
        res.json({success:true,message:"doctor created"});
    }
    catch(error)
    {
        console.log(error)
        res.json({status:false,message:error.message})
    }
}


//here api for admin login
const loginAdmin=async (req,res)=>{
    try
    {
        const {email,password}=req.body;
        if(email===process.env.ADMIN_EMAIL && password===process.env.ADMIN_PASSWORD)
        {
            const token=jwt.sign(email+password,process.env.JWT_SECRET)
            res.json({success:true,token})
        }
        else
        {
            res.json({success:false,message:"Invalid Credentials"});

        }
    }
    catch(error)
    {
        console.log(error)
        res.json({success:false,message:error.message})
    }
}


//api to get all doctors list for admin panel
const allDoctors = async (req, res) => {
    try {

        const doctors = await doctorModel.find({}).select('-password')
        res.json({ success: true, doctors })

    } catch (error) {
        console.log(error)
        res.json({ success: false, message: error.message })
    }
}



export {addDoctor,loginAdmin,allDoctors}  