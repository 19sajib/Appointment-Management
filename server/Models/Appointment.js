const mongoose = require('mongoose')

const slotSchema = new mongoose.Schema({
    time: {
        type: String,
        required: true
    },
    isBooked: {
        type: Boolean,
        default: false
    }
}, {timestamps: true})

const dateSchema = new mongoose.Schema({
    date: {
        type: String,
        required: true
    },
    slots: [slotSchema]
}, { timestamps: true })

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
    dateId: {
        type: String,
        required: true
    },
    date: {
        type: String
    },
    slotId: {
        type: String,
        required: true
    },
    slotTime: {
        type: String
    },
    isDelayed: {
        type: Boolean,
        default: false
    },
    isCancelled: {
        type: Boolean,
        default: false
    },
    isApproved: {
        type: Boolean,
        default: false
    }
}, { timestamps: true })

const SlotModel = mongoose.model('Slot', slotSchema)
const DateModel = mongoose.model('Date', dateSchema)
const AppointmentModel = mongoose.model('Appointment', appointmentSchema)

module.exports = {
    AppointmentModel,
    SlotModel,
    DateModel,
}