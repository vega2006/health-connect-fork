import validator from 'validator'
import bcrypt from 'bcrypt'
import userModel from '../model/userModel.js';
import jwt from 'jsonwebtoken'
import {v2 as cloudinary} from 'cloudinary'
import doctorModel from '../model/doctorModel.js'
import appointmentModel from '../model/appointmentModel.js';
//api to register user
  
const registerUser=async(req,res)=>{
    try {
        const {name,email, password}=req.body;
        if(!name|!email||!password)
        {
            return res.json({success:false,message:"Missing Details"})
        }
        if(!validator.isEmail(email)){
            return res.json ({success:false,message:"invalid email"})
        }
        if(password.length<8)
        {
            return res.json ({success:false,message:"enter a strong password"})
        }
        //hashing user password
        const salt =await bcrypt.genSalt(10);
        const hashedPassword=await bcrypt.hash(password,salt)
        const userData={
            name,
            email,
            password:hashedPassword
        }
        const newUser=new userModel(userData);
        const user=await newUser.save();
        
        const token=jwt.sign({id:user._id},process.env.JWT_SECRET);
        res.json({success:true,token});


    } catch (error) {
        console.log(error)
        res.json({ success: false, message: error.message })
    }
}



//api for user login 

const userLogin=async (req,res)=>{
    try {
        const {email,password}=req.body;
        const user=await userModel.findOne({email})
        if(!user){
            return res.json({success:false,message:"user does not exist"})
        }
        const isMatch=await bcrypt.compare(password,user.password);
        if(isMatch)
        {
            const token=jwt.sign({id:user._id},process.env.JWT_SECRET);
            return res.json({success:true,token});
        }
        else
        {
            return res.json({success:false,message:"invalid credentials"})
        }
    } catch (error) {
        console.log(error)
        res.json({ success: false, message: error.message })
    }
}
//api to get user profile data
const getProfile=async (req,res)=>{
    try{
        const {userId}=req.body
        const userData=await userModel.findById(userId).select('-password');
        res.json({success:true,userData});
    }catch(e){
        console.log(e);
        res.json({ success: false, message: e.message })

    }
}
const updateProfile = async (req,res)=>{
    try{
        const {userId,name,phone,address,dob,gender}=req.body
        const imageFile=req.file
        if(!name || !phone || !dob || !gender){
            return res.json({success:false,message:"Data Missing"})
        }
            const updateData = { name, phone, dob, gender };
            if (address) {
                updateData.address = JSON.parse(address);
            }
            await userModel.findByIdAndUpdate(userId, updateData);
            if(imageFile){
                const imageUpload=await cloudinary.uploader.upload(imageFile.path,{resource_type:"image"})
                const imageUrl=imageUpload.secure_url
                
                await userModel.findByIdAndUpdate(userId,{image:imageUrl})
            }
            
            
            res.json({success:true,messgae:"Profile Updated successfully"})
        
    }catch(e){
        console.log(e);
        res.json({success:false,message:e.message})
        
    }
}

//Api to book appointment

const bookAppointment=async(req,res)=>{
    try {
        const {userId,docId,slotDate,slotTime}=req.body;
        const docData=await doctorModel.findById(docId).select('-password');

        if(!docData.available){
            return res.json({success:false,message:"Doctor not available"})
        }
        const slots_booked=docData.slots_booked

        //checking for slots availiblity
        if(slots_booked[slotDate])
        {
            if(slots_booked[slotDate].includes(slotTime))
            {
                return res.json({success:false,message:"Slot not available"})
            }
            else{
                 slots_booked[slotDate].push(slotTime)

            }
        } 
        else
        {
            slots_booked[slotDate]=[];
            slots_booked[slotDate].push(slotTime);

        }

        const userData=await userModel.findById(userId).select('-password');

        delete docData.slots_booked;

        const appointmentData={
            userId,
            docId,
            userData,
            docData,
            amount:docData.fees,
            slotTime,
            slotDate,
            date:Date.now()
        }

        const newAppointment=new appointmentModel(appointmentData);
        await newAppointment.save(); 

        //update docter slot_data
        await doctorModel.findByIdAndUpdate(docId,{slots_booked});
        res.json({success:true,message:"Appointment Booked"})


    } catch (error) {
        console.log(e);
        res.json({success:false,message:e.message})
    }
}



//api to get user appointment for frontend/my-appointment page

const listAppointment=async(req,res)=>{

    try {
        const {userId}=req.body
        const appointments=await appointmentModel.find({userId})
         res.json({success:true,appointments})
    } catch (error) {
        console.log(e);
        res.json({success:false,message:e.message})
    }
}





export {registerUser ,userLogin,getProfile,updateProfile,bookAppointment,listAppointment} 