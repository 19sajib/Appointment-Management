const express = require('express')

const { getAppointment, getAppointData, getDate, getSlot } = require('../Controllers/Appointment')

const router = express.Router()

router.post('/date', getDate)
router.post('/slot', getSlot)
router.get('/user/:id', getAppointData)
router.post('/booking', getAppointment)

module.exports = router