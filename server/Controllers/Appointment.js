const { DateModel, SlotModel, AppointmentModel } = require('../Models/Appointment')


// ---> Checking Slot Avability Helper Function <---

const slotHelper = async ({time,date}) =>{
    const oldDate = await DateModel.findOne({date})
    const oldTime = await SlotModel.findOne({time})
    if(!oldTime) {
        const newTime = new SlotModel(time)
        await newTime.save()
        oldDate.slots.push(newTime)
        await oldDate.save()
        return {oldDate, newTime}
    }
    return {oldDate,oldTime}
}


// ---> Checking / Creating Schedule of A Day <---

const getDate = async (req, res) => {
    const {date} = req.body
    try {
        const oldDate = await DateModel.findOne({date})
        if (oldDate) return res.status(200).json(oldDate)

        const newDate = new DateModel(req.body)
        await newDate.save()
        res.status(201).json(newDate)
    } catch (error) {
        res.status(500).json({message: error.message})
    }
}


// ---> Checking Slot Avability <---

const getSlot = async (req, res) => {
    const {date, time} = req.body
    try {
        const oldDate = await DateModel.findOne({date})
        const oldTime = await SlotModel.findOne({time})
        if(!oldTime) {
        const newTime = new SlotModel({time})
        await newTime.save()
        oldDate.slots.push(newTime)
        await oldDate.save()
        return res.status(200).json({oldDate, newTime})
        }
        res.status(200).json({oldDate,oldTime})
    } catch (error) {
        res.status(500).json({message: error.message})
    }
}


// ---> Asking For Appointment <---

const getAppointment = async (req, res) => {
    const {patientId, patientName, patientEmail, date, slotTime, dateId, slotId} = req.body

    try {
        const updateSlot = await SlotModel.findById(slotId)
        updateSlot.isBooked = true
        await updateSlot.save()
        const newBooking = new AppointmentModel(req.body)
        newBooking.save()
        res.status(200).json({updateSlot, newBooking})
    } catch (error) {
        res.status(500).json({message: error.message})
    }
}


module.exports = { getSlot, getDate, getAppointment }
