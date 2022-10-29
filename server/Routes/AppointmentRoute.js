const express = require('express')

const { getAppointment, getDate, getSlot } = require('../Controllers/Appointment')

const router = express.Router()

router.post('/date', getDate)
router.post('/slot', getSlot)
router.post('/booking', getAppointment)

module.exports = router