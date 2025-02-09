import express from 'express'
import { doctorList, loginDoctor , appointmentsDoctor, appointmentCancel, appointmentComplete } from '../controller/doctorController.js'
import authDoctor from '../middleware/authDoctor.js'

const doctorRouter=express.Router()
doctorRouter.get('/list',doctorList)
doctorRouter.post('/login',loginDoctor)
doctorRouter.get('/appointments',authDoctor,appointmentsDoctor)
doctorRouter.post('/cancel-appointment',authDoctor,appointmentCancel)
doctorRouter.post('/complete-appointment',authDoctor,appointmentComplete)
export default doctorRouter