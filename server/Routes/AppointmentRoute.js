const express = require('express')

const { getAppointment, getAppointData, allAppointment, cancelAppointment, getDate, getSlot, singleAppointment, rescheduleAppointment } = require('../Controllers/Appointment')
import { verifyToken, verifyTokenAndAdmin, verifyTokenAndAuthorization } from '../Middleware/verifyToken.js'

const router = express.Router()

router.post('/date', verifyToken, getDate)
router.post('/slot', verifyToken, getSlot)
router.get('/all', verifyTokenAndAdmin, allAppointment)
router.get('/user/:id', verifyTokenAndAuthorization, getAppointData)
router.post('/booking', verifyToken, getAppointment)
router.get('/single/:id', verifyToken, singleAppointment)
router.get('/cancel/:id', verifyToken, cancelAppointment)
router.post('/reschedule/:id', verifyToken, rescheduleAppointment)

module.exports = router