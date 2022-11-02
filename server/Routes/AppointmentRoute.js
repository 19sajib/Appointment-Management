const express = require('express')

const { getAppointment, getAppointData, allAppointment, 
        cancelAppointment, getDate, getSlot, singleAppointment, 
        rescheduleAppointment, searchByName } = require('../Controllers/Appointment')
const { verifyToken, verifyTokenAndAdmin, verifyTokenAndAuthorization } = require('../Middleware/verifyToken')

const router = express.Router()

router.post('/date', verifyToken, getDate)
router.post('/slot', verifyToken, getSlot)
router.get('/all', verifyTokenAndAdmin, allAppointment)
router.post('/search', searchByName)
router.get('/user/:id', verifyTokenAndAuthorization, getAppointData)
router.post('/booking', verifyToken, getAppointment)
router.get('/single/:id', verifyToken, singleAppointment)
router.get('/cancel/:id', verifyToken, cancelAppointment)
router.post('/reschedule/:id', verifyToken, rescheduleAppointment)

module.exports = router