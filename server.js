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
mongoose.connect("mongodb+srv://damilicevic:0989588280@webapp.hafaeyx.mongodb.net/?retryWrites=true&w=majority")
    .then(() => {
        // slušanje requestova
    app.listen(4000, () => {
    console.log('spojen na mongodb & slušanje na portu', 4000)
})
    })
    .catch((error) => {
        console.log(error)
    })




