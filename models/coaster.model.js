const mongoose = require('mongoose')
const Schema = mongoose.Schema

const coasterModel = new Schema({
    name: {
        type: String,
        required: [true, 'The name is mandatory']
    },
    description: {
        type: String,
        required: [true, 'The description is mandatory']
    },
    inversions: {
        type: Number,
        required: [true, 'The inversions are mandatory']
    },
    length: {
        type: Number,
        required: [true, 'The length is mandatory']
    },
    active: { 
        type: Boolean, 
        default: false 
    },
    park_id: {
        type: Schema.Types.ObjectId,
        ref: 'Park',
        required: [true, 'Please select a park']
      }
})

module.exports = mongoose.model('Coaster', coasterModel)