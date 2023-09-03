require('dotenv').config()


const express = require('express')
const mongoose = require('mongoose')
const hranaRoutes = require('./routes/hrana')
const userRoutes = require('./routes/user')
// express aplikacija
const app = express()

//middleware
app.use(express.json())

app.use((req, res, next) => {
    console.log(req.path, req.method)
    next()
})

// routes
app.use('/api/hrana', hranaRoutes)
app.use('/api/user', userRoutes)

// connect to db
mongoose.connect(process.env.MONGO_URI)
    .then(() => {
        // slušanje requestova
    app.listen(process.env.PORT, () => {
    console.log('spojen na mongodb & slušanje na portu', process.env.PORT)
})
    })
    .catch((error) => {
        console.log(error)
    })




