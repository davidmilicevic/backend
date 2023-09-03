const mongoose = require('mongoose')

const Schema = mongoose.Schema

const namirniceSchema = new Schema({
    naziv: {
        type: String,
        required: true
    },
    kolicina: {
        type: Number,
        required: true
    },
    kalorije: {
        type: Number,
        required: true
    },
    user_id: {
        type: String,
        required: true
    }
}, {timestamps: true})

module.exports = mongoose.model('Namirnice', namirniceSchema)
