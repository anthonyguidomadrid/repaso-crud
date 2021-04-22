const express = require('express')
const router = express.Router()

const mongoose = require('mongoose')

const Park = require('../models/park.model')
const Coaster = require('../models/coaster.model')

const { isLoggedIn, checkRoles, sendEmail } = require('./../middlewares')
const { isAdmin, formatValidationError } = require('./../utils')


// New coaster (GET)
router.get('/new', isLoggedIn, checkRoles('ADMIN'), (req, res) => {
    Park
        .find()
        .then(allParks => res.render('pages/coasters/new-coaster', {allParks} ))
        .catch(err => {
            console.log('Error:', err)
            sendEmail()
        })
 })       

// New coaster (POST)
router.post('/new', isLoggedIn, checkRoles('ADMIN'), (req, res) => {
    const {name, description, inversions, length, active, park_id} = req.body

    Coaster
        .create({name, description, inversions, length, active, park_id})
        .then(() => res.redirect('/coasters'))
        .catch(err => {
            if (err instanceof mongoose.Error.ValidationError) {
                res.render('pages/coasters/new-coaster', { errorMessage: formatValidationError(err) })
            } else {
                next()
            }
        })
})

// Coaster list (GET)
router.get('/', (req, res) => {
    Coaster
        .find()
        .populate('park_id')
        .then(allCoasters => res.render('pages/coasters/coasters-index', {allCoasters}))
        .catch(err => console.log('Error:', err))
    })

// Coaster detail (GET)
router.get('/:id', (req, res) => {
    Coaster
        .findById(req.params.id)
        .populate('park_id')
        .then(coaster => res.render('pages/coasters/coaster-details', {coaster, isAdmin: isAdmin(req.session.currentUser)}))
        .catch(err => console.log('Error:', err))
})

// Delete coaster (POST)
router.post('/delete', isLoggedIn, checkRoles('ADMIN'), (req, res) => {

    const { id } = req.query

    Coaster
        .findByIdAndRemove(id)
        .then(() => res.redirect('/coasters'))
        .catch(err => console.log('Error:', err))
})

// Edit coaster (GET)
router.get('/edit/:id', isLoggedIn, checkRoles('ADMIN'), (req, res) => {
    
    //Promise.all().then()

    Coaster
    .findById(req.params.id)
    .populate('park_id')
    .then(coaster => {
            Park
                .find()  
                .then( allParks => res.render('pages/coasters/coaster-edit', {coaster, allParks}))
                .catch(err => console.log('Error:', err)) 
        })
        .catch(err => {
            console.log('Error:', err)
            sendEmail()
        })

})

// Edit coaster (POST)
router.post('/edit', isLoggedIn, checkRoles('ADMIN'), (req, res) => {

    const { id } = req.query
    const {name, description, inversions, length, active, park_id} = req.body

    Coaster
        .findByIdAndUpdate(id, {name, description, inversions, length, active, park_id})
        .then(coaster => res.redirect(`/coasters/${coaster._id}`))
        .catch(err => console.log('Error:', err))
})

module.exports = router