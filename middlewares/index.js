module.exports = {
    isLoggedIn: (req, res, next) => {
        if (req.session.currentUser) {
            next()
        }
        else {
            res.render('pages/auth/login', { errorMessage: 'Please log in' })
        }
    },
    checkRoles: (...allowedRoles) => (req, res, next) => {          
        if (allowedRoles.includes(req.session.currentUser.role)) {
            next()
        } else {
            res.render('pages/auth/login', { errorMessage: 'Not authorized' })
        }
    },
    sendEmail: () => {
        transporter
        .sendMail({
            from: "'Ironhack' <myawesome@project.com>",
            to: 'anthonyguidotourism@gmail.com',
            subject: 'Alert',
            text: 'Somebody tried to access to the admin part of the website',
            html: `<b>${text}</b>`
        })
        .then(info => res.send(info))
        .catch(error => console.log(error))
    }
}