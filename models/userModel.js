const mongoose = require ('mongoose')
const bcrypt = require('bcrypt')
const validator = require('validator')

const Schema = mongoose.Schema

const userSchema = new Schema ({
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    }
})

// statična signup metoda

userSchema.statics.signup = async function(email, password) {

    //valdiation
    if( !email || !password) {
        throw Error('Sva polja moraju biti ispunjena')
    }
    if (!validator.isEmail(email)){
        throw Error('Nevažeći email')
    }
    if(!validator.isStrongPassword(password)){
        throw Error('Password nije dovoljno snažan')
    }

    const exists = await this.findOne({ email })

    if (exists) {
        throw Error('Email već postoji')
    }

    const salt = await bcrypt.genSalt(10)
    const hash = await bcrypt.hash(password, salt)

    const user = await this.create({ email, password: hash })

    return user

}


// statična login metoda
userSchema.statics.login = async function (email, password) {
    if( !email || !password) {
        throw Error('Sva polja moraju biti ispunjena')
}

const user = await this.findOne({ email })

if (!user) {
    throw Error('Netočan email')
}

const match = await bcrypt.compare(password, user.password)

if (!match) {
    throw Error('Netočan password')
}

return user
}

module.exports = mongoose.model('User', userSchema)