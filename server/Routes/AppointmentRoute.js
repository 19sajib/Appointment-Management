const express = require('express')

const { getAppointment, getAppointData, cancelAppointment, getDate, getSlot } = require('../Controllers/Appointment')

const router = express.Router()

router.post('/date', getDate)
router.post('/slot', getSlot)
router.get('/user/:id', getAppointData)
router.get('/cancel/:id', cancelAppointment)
router.post('/booking', getAppointment)

module.exports = router