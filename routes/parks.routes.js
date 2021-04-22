const express = require('express')
const router = express.Router()

const mongoose = require('mongoose')

const Park = require('../models/park.model')

const { isLoggedIn, checkRoles } = require('./../middlewares')
const { isAdmin } = require('./../utils')

// New park (GET)
router.get('/new', isLoggedIn, checkRoles('ADMIN'), (req, res) => res.render('pages/parks/new-park'))

// New park(POST)
router.post('/new', isLoggedIn, checkRoles('ADMIN'), (req, res) => {
    const { name, description, active } = req.body
    Park 
        .create({name, description, active})
        .then(() => res.redirect('/parks'))
        .catch(err => console.log('Error', err))
})

// Park list (GET)
router.get('/', (req, res) => {
    Park
        .find()
        .then(allParks => res.render('pages/parks/parks-index', {allParks}))
        .catch(err => console.log('Error:', err))
    })

// Park detail (GET)
router.get('/:id', (req, res) => {
    Park
        .findById(req.params.id)
        .then(park => res.render('pages/parks/park-details', {park, isAdmin: isAdmin(req.session.currentUser)}))
        .catch(err => console.log('Error:', err))
})

// Delete park (POST)
router.post('/delete', isLoggedIn, checkRoles('ADMIN'), (req, res) => {

    const { id } = req.query

    Park
        .findByIdAndRemove(id)
        .then(() => res.redirect('/parks'))
        .catch(err => console.log('Error:', err))
})

// Edit park (GET)
router.get('/edit/:id', isLoggedIn, checkRoles('ADMIN'), (req, res) => {

    Park
        .findById(req.params.id)
        .then(park => res.render('pages/parks/park-edit', {park}))
        .catch(err => console.log('Error:', err))
})

// Edit park (POST)
router.post('/edit', isLoggedIn, checkRoles('ADMIN'), (req, res) => {

    const { id } = req.query
    const { name, description, active } = req.body

    Park
        .findByIdAndUpdate(id, { name, description, active })
        .then(park => res.redirect(`/parks/${park._id}`))
        .catch(err => console.log('Error:', err))
})


module.exports = router
