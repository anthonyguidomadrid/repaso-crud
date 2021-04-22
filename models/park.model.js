const mongoose = require('mongoose')
const Schema = mongoose.Schema

const parkSchema = new Schema({
    name: String,
    description: String,
    active: { 
        type: Boolean, 
        default: false 
    }
})

const Park = mongoose.model('Park', parkSchema)

module.exports = Park