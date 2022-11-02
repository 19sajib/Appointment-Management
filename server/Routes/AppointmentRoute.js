const express = require('express')

const { getAppointment, getAppointData, allAppointment, cancelAppointment, getDate, getSlot, singleAppointment, rescheduleAppointment } = require('../Controllers/Appointment')

const router = express.Router()

router.post('/date', getDate)
router.post('/slot', getSlot)
router.get('/all', allAppointment)
router.get('/user/:id', getAppointData)
router.post('/booking', getAppointment)
router.get('/single/:id', singleAppointment)
router.get('/cancel/:id', cancelAppointment)
router.post('/reschedule/:id', rescheduleAppointment)

module.exports = router