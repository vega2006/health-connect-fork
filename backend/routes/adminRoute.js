import express from 'express';
import { addDoctor, loginAdmin } from '../controller/adminController.js';
import upload from '../middleware/multer.js';

const adminRouter=express.Router();

adminRouter.post('/add-doctor',upload.single('image'),addDoctor);
adminRouter.post('/login',loginAdmin)
export default adminRouter;