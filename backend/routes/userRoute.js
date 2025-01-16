import express from 'express';
import { registerUser,userLogin,getProfile,updateProfile} from '../controller/userController.js';
import authUser from '../middleware/authUser.js';
import upload from '../middleware/multer.js';
const userRouter=express.Router();

userRouter.post("/register", registerUser)
userRouter.post("/login",userLogin);
userRouter.get('/get-profile',authUser,getProfile)
userRouter.post('/update-profile',upload.single('image'),authUser,updateProfile)
export default userRouter;