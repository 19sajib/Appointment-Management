const cors= require('cors');
const dotenv = require('dotenv')
const express = require('express')
const mongoose = require('mongoose')
const bodyParser = require('body-parser')

const AuthRoute = require('./Routes/AuthRoute')
const AppointmentRoute = require('./Routes/AppointmentRoute')
const app = express()
dotenv.config()

app.use(bodyParser.json({limit: '30mb', extended: true}))
app.use(bodyParser.urlencoded({limit: '30mb', extended: true}))
app.use(cors())

// ---> Server Setting <---

const PORT = process.env.PORT || 1919
const server = app.listen(PORT, ()=> console.log(`Server is up and running on port: ${PORT}`))

// ---> Database Setting <---

mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
}, (err) => {
    if(err) return console.log(err);
    console.log("MongoDB connected...")
})

// ---> Routes <---

app.use('/auth', AuthRoute)
app.use('/app', AppointmentRoute)