// create an instance of express routers
const express = require('express')
const db = require('../models')
const router = express.Router()


// mount our routes on the router
router.get('/new', (req, res) => {
    res.render('users/new.ejs')
})
// the port thing
router.post('/', async (req, res) => {
    try {
        // based on the info in the req.body
        const [newUser, created] = await db.user.findOrCreate({
            where: {
                email: req.body.email
            },
            // TODO: dont add plaintext passwords
            defaults: {
                password: req.body.password
            }
        })
        // TODO: redirect to the login page if the user is found
        // log the user in (store the user's id as a cookie in the browser
        res.cookie('userId', newUser.id)
        // redirect to the home page (for now)
        res.redirect('/')
    }catch(err) {
        console.log(err)
        res.status(500).send('post error')
    }
})


// export the router
module.exports = router