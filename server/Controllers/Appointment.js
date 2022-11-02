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
        res.status(500).json({message: error.message})
    }
}

// ---> Cancellign An Appiontment <--

const cancelAppointment = async (req,res) => {

    try {
        const oldBooking = await AppointmentModel.findById(req.params.id)
        if(!oldBooking) return res.status(403).json({message: "There is no such appointment"})
        oldBooking.isCancelled = true;
        await oldBooking.save()
        const oldSlot = await SlotModel.findById(oldBooking.slotId)
        oldSlot.isBooked = false
        await oldSlot.save()
        res.status(200).json({oldBooking, message: "Your Appointment Cancelled Successfully..."})
    } catch (error) {
        res.status(500).json({message: error.message})
    }
}

// ---> Getting All Appointment of An User <---

const getAppointData = async(req, res) =>{
    
    try {
        const appointData = await AppointmentModel.find({patientId:req.params.id})
        res.status(200).json(appointData)
    } catch (error) {
        res.status(500).json({message: error.message})
    }
}

// ---> Getting All The Appointment <---

const allAppointment = async (req, res) => {
    const { page } = req.query;
    try {
        const LIMIT = 6
        // get the starting index of every page
        const startIndex = (Number(page)-1) * LIMIT
        const total = await AppointmentModel.countDocuments()
        //getting post for given page number
        const appointData = await AppointmentModel.find().sort({createdAt: 1}).limit(LIMIT).skip(startIndex)

        res.status(200).json({appointData, currentPage: Number(page), numberOfPages: Math.ceil(total / LIMIT)})
    } catch (error) {
        res.status(500).json({message: error.message})
    }
}

// ---> Getting Single Appointment Data <---

const singleAppointment = async (req, res) => {
    try {
        const appointData = await AppointmentModel.findById(req.params.id)
        if(!appointData) return res.status(403).json({message: "There is no such appointment"})
        res.status(200).json(appointData)
    } catch (error) {
        res.status(500).json({message: error.message})
    }
}


module.exports = { getSlot, getDate, getAppointment, 
                   getAppointData, cancelAppointment, 
                   singleAppointment, allAppointment }
