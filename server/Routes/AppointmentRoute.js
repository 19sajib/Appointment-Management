const express = require('express')

const { getAppointment, getAppointData, allAppointment, cancelAppointment, getDate, getSlot, singleAppointment } = require('../Controllers/Appointment')

const router = express.Router()

router.post('/date', getDate)
router.post('/slot', getSlot)
router.get('/all', allAppointment)
router.get('/user/:id', getAppointData)
router.get('/single/:id', singleAppointment)
router.get('/cancel/:id', cancelAppointment)
router.post('/booking', getAppointment)

module.exports = router