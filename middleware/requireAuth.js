const jwt = require ('jsonwebtoken')
const User = require('../models/userModel')

const requireAuth = async(req, res, next) => {

    // verifikacija autentifikacije
    const { authorization } = req.headers

    if (!authorization) {
        return res.status(401).json({error: 'Autorizacija tokena potrebna'})
    }

    const token = authorization.split(' ')[1]

    try {
        const {_id} = jwt.verify(token, "c3ep5Lte9l?r2&$gopR3")

        req.user = await User.findOne({ _id }).select('_id')
        next()

    } catch (error) {
        console.log(error)
        res.status(401).json({error: 'Request nije autoriziran'})
    }
}

module.exports = requireAuth