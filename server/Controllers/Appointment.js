const { SlotModel, AppointmentModel } = require('../Models/Appointment')





// ---> Getting All The Schedule of A Day <---

const getDate = async (req, res) => {
    const {date} = req.body
    try {
        const dateTime = await SlotModel.find({date})
        res.status(200).json(dateTime)
    } catch (error) {
        res.status(500).json({message: error.message})
    }
}


// ---> Checking Slot Avability <---

const getSlot = async (req, res) => {
    const {date, time} = req.body
    try {
        const timeDate = await SlotModel.findOne({date, time})
        if(timeDate) return res.status(200).json(timeDate)
        const newTimeDate = new SlotModel(req.body)
        await newTimeDate.save()
        return res.status(201).json(newTimeDate)
    } catch (error) {
        res.status(500).json({message: error.message})
    }
}


// ---> Making An Appointment <---

const getAppointment = async (req, res) => {
    const {date, time} = req.body
    try {
        // ---> Checking Slot Avability <---

        const oldSlot = await SlotModel.findOne({date, time})
        if(!oldSlot){
            const newSlot = new SlotModel({date, time, isBooked:true})
            await newSlot.save()
            req.body.slotId = newSlot._id;
   
            const newBooking = new AppointmentModel(req.body)
            newBooking.save()
            return res.status(201).json({newSlot, newBooking})
            
        }
        
        if(oldSlot.isBooked) return res.status(403).json({message: "Someone just booked the slot, please try another slot!"})
        
        oldSlot.isBooked = true
        await oldSlot.save()

        req.body.slotId = oldSlot._id

        // ---> Creating An Appointment <---

        const newBooking = new AppointmentModel(req.body)
        newBooking.save()
        
        res.status(201).json({oldSlot, newBooking, message: 'Your Appointment has been booked successfully.'})
    } catch (error) {
        console.log(error)
        res.status(500).json({message: error.message})
    }
}


module.exports = { getSlot, getDate, getAppointment }
