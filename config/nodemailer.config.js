const nodemailer = require('nodemailer')

let transporter = nodemailer.createTransport({
    service: 'Gmail',
    auth: {
        user: 'anthonyguidoiron@gmail.com',
        pass: ''
    }
})

module.exports = transporter