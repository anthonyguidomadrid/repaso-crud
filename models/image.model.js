const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const pictureSchema = new Schema({
    description: String,
    path: String        
}, {
    timestamps: true
})

const Picture = mongoose.model("Picture", pictureSchema)

module.exports = Picture