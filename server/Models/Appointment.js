const mongoose = require('mongoose')

const slotSchema = new mongoose.Schema({
    date: {
        type: String,
        required: true
    },
    time: {
        type: String,
        required: true
    },
    isBooked: {
        type: Boolean,
        default: false
    }
}, {timestamps: true})

const appointmentSchema = new mongoose.Schema({
    patientId: {
        type: String,
        required: true,
    },
    patientName: {
        type: String,
        required: true
    },
    patientEmail: {
        type: String,
        require: true
    },
    patientContact: {
        type: String,
        required: true
    },
    date: {
        type: String,
        required: true
    },
    time: {
        type: String,
        required: true
    },
    slotId: {
        type: String,
        required: true
    },
    isRescheduled: {
        type: Boolean,
        default: false
    },
    isCancelled: {
        type: Boolean,
        default: false
    },
}, { timestamps: true })

const SlotModel = mongoose.model('Slot', slotSchema)
const AppointmentModel = mongoose.model('Appointment', appointmentSchema)

module.exports = {
    AppointmentModel,
    SlotModel
}