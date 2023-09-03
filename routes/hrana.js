const express = require('express')
const {
    createNamirnice,
    getHrana,
    getNamirnice,
    deleteNamirnice,
    updateNamirnice
} = require('../kontroleri/namirniceKontroleri')
const requireAuth = require('../middleware/requireAuth')

const router = express.Router()

// potrebna autorizacija za sve hrana rute
router.use(requireAuth)


// GET all hrana
router.get('/', getHrana)

// GET single hrana
router.get('/:id', getNamirnice)

// POST new hrana
router.post('/', createNamirnice)
// DELETE hrana 
router.delete('/:id', deleteNamirnice)


// UPDATE hrana
router.patch('/:id', updateNamirnice)


module.exports = router