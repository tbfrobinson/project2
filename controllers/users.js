// create an instance of express routers
const express = require('express')
const db = require('../models')
const router = express.Router()
const crypto = require('crypto-js')
const bcrypt = require('bcrypt')


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
        })
        if (!created) {
            console.log('user exists!')
            res.redirect('/users/login?message=Please log in to continue')
        } else {
            // here we know its a new user
            // hash the supplied password
            const hashedPassword = bcrypt.hashSync(req.body.password, 12)
            newUser.password = hashedPassword
            await newUser.save() // actually save the new password in the db
            // encrypt the new user's id and convert it into a string
            const encryptedId = crypto.AES.encrypt(String(newUser.id), process.env.SECRET)
            const encryptedIdString = encryptedId.toString()
            // place the encrypted id in a cookie
            res.cookie('userId', encryptedIdString)
            // redirect to user's profile
            res.redirect('/users/profile')
        }
        // TODO: redirect to the login page if the user is found
        // log the user in (store the user's id as a cookie in the browser
        // redirect to the home page (for now)
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
        } else if (!bcrypt.compareSync(req.body.password, user.password)) {
            // if the user's supplied password is incorrect
            res.redirect('/users/login?message=' + badCredentialMessage)
        } else {
            // if the user is found and their password matches log them in
            console.log('loggin user in')

            const encryptedId = crypto.AES.encrypt(String(user.id), process.env.SECRET)
            const encryptedIdString = encryptedId.toString()

            res.cookie('userId', encryptedIdString)
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