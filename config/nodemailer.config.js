const nodemailer = require('nodemailer')

let transporter = nodemailer.createTransport({
    service: 'Gmail',
    auth: {
        user: 'anthonyguidoiron@gmail.com',
        pass: 'anthonyGuido89'
    }
})

module.exports = transporter