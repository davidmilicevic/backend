// kreiramo reference da ne bi morali hardkodirati
const Namirnice = require('../models/namirniceModel')
const mongoose = require('mongoose')

// get sva hrana
const getHrana = async (req, res) => {
    const user_id = req.user._id

    const hrana = await Namirnice.find({ user_id }).sort({createdAt: -1})

    res.status(200).json(hrana)
}

// get jednu namirnicu
const getNamirnice = async (req, res) => {
    const {id} = req.params
    
    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({error: 'Nema takve namirnice'})
    }

    const namirnice = await Namirnice.findById(id)

    if(!namirnice) {
        return res.status(404).json({error: 'Nema takve namirnice'})
    }

    res.status(200).json(namirnice)
}


// kreiranje hrane
const createNamirnice = async (req, res) => {
    const {naziv, kolicina, kalorije} = req.body

    let emptyFields = []

    if(!naziv) {
        emptyFields.push('naziv')
    }
    if(!kolicina) {
        emptyFields.push('kolicina')
    }
    if(!kalorije) {
        emptyFields.push('kalorije')
    }
    if(emptyFields.length > 0) {
        return res.status(400).json({ error: 'Molim vas ispišite sva polja', emptyFields })
    }

    // dodavanje dokumenta u mongodb
    try {
        const user_id = req.user._id
        const namirnice = await Namirnice.create({naziv, kolicina, kalorije, user_id})
        res.status(200).json(namirnice)
    } catch(error){
        res.status(400).json({error: error.message})
    }
}

// brisanje hrane
const deleteNamirnice = async (req, res) => {
    const {id} = req.params

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({error: 'Nema takve namirnice'})
    }

    const namirnice = await Namirnice.findOneAndDelete({_id: id})

    if(!namirnice) {
        return res.status(400).json({error: 'Nema takve namirnice'})
    }
     
    res.status(200).json(namirnice)
}

// update hrane
const updateNamirnice = async (req, res) => {
    const {id} = req.params

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({error: 'Nema takve namirnice'})
    }

const namirnice = await Namirnice.findOneAndUpdate({_id: id}, {
    ...req.body
})

if (!namirnice) {
    return res.status(400).json({error: 'Nema takve namirnice'})
}

res.status(200).json(namirnice)
}


module.exports = {
    getHrana,
    getNamirnice,
    createNamirnice,
    deleteNamirnice,
    updateNamirnice
}