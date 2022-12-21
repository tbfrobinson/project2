// create an instance of express routers
const express = require('express')
const db = require('../models')
const router = express.Router()


// mount our routes on the router
router.get('/new', (req, res) => {
    res.render('users/new.ejs', {
        user: res.locals.user
    })
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
        res.redirect('/users/profile')
    }catch(err) {
        console.log(err)
        res.status(500).send('post error')
    }
})


// GET /users/login -- renders a login form that POSTS to /users/login
router.get('/login', (req, res) => {
    res.render('users/login', {
        message: req.query.message ? req.query.message : null,
        user: res.locals.user
    })
})

// POST /users/log -- ingest data from form rendered @ GET /users/login
router.post('/login', async (req, res) => {
    try {
        // look up the user based on their email
        const user = await db.user.findOne({
            where: {
                email: req.body.email
            }
        })
        //boilerplate message if login fails
        const badCredentialMessage = 'username or password incorrect'
        if (!user) {
            // if the user isnt found in the db
            res.redirect('/users/login?message=' + badCredentialMessage)
        } else if (user.password !== req.body.password) {
            // if the user's supplied password is incorrect
            res.redirect('/users/login?message=' + badCredentialMessage)
        } else {
            // if the user is found and their password matches log them in
            console.log('loggin user in')
            res.cookie('userId', user.id)
            res.redirect('/users/profile')
        }
    } catch(err){   
        console.log(err)
        res.status(500).send('server error')
    }
})

// GET /users/logout -- clear any cookies and redirect to the home page
router.get('/logout', (req, res) => {
    // log the user out by removing the cookie
    res.clearCookie('userId')
    res.redirect('/')
})

router.get('/profile', (req, res) => {
    if (!res.locals.user){
        res.redirect('/users/login?message=You must authenticate before you are authorized to view this resource.')
    } else {
        res.render('users/profile', {
            user: res.locals.user
        })
    }
})
// export the router
module.exports = router