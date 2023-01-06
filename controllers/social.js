// create an instance of express routers
const express = require('express')
const db = require('../models')
const router = express.Router()
const crypto = require('crypto-js')
const bcrypt = require('bcrypt')




// mount our routes on the router
router.get('/new', (req, res) => {
    res.render('social/new.ejs', {
        user: res.locals.user
    })
})
// the port thing
router.post('/', async (req, res) => {
    try {
        // based on the info in the req.body
        const [newUser, created] = await db.user.findOrCreate({
            where: {
                username: req.body.username,
                email: req.body.email
            },
            // TODO: dont add plaintext passwords
        })
        if (!created) {
            console.log('user exists!')
            res.redirect('/social/login?message=Please log in to continue')
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
            res.redirect('/social/profile')
        }
        // TODO: redirect to the login page if the user is found
        // log the user in (store the user's id as a cookie in the browser
        // redirect to the home page (for now)
    }catch(err) {
        console.log(err)
        res.status(500).send('post error')
    }
})

router.get('/', async (req, res) => {
    try {
        res.render('social/search.ejs', {
            user: res.locals.user
        })
    } catch(err) {
        console.log(err)
        res.status(500).send('1 error')
    }
})


// GET /social/login -- renders a login form that POSTS to /social/login
router.get('/login', (req, res) => {
    res.render('social/login', {
        message: req.query.message ? req.query.message : null,
        user: res.locals.user
    })
})

// POST /social/log -- ingest data from form rendered @ GET /social/login
router.post('/login', async (req, res) => {
    try {
        // look up the user based on their email
        const user = await db.user.findOne({
            where: {
                username: req.body.username
            }
        })
        //boilerplate message if login fails
        const badCredentialMessage = 'username or password incorrect'
        if (!user) {
            // if the user isnt found in the db
            res.redirect('/social/login?message=' + badCredentialMessage)
        } else if (!bcrypt.compareSync(req.body.password, user.password)) {
            // if the user's supplied password is incorrect
            res.redirect('/social/login?message=' + badCredentialMessage)
        } else {
            // if the user is found and their password matches log them in
            console.log('loggin user in')

            const encryptedId = crypto.AES.encrypt(String(user.id), process.env.SECRET)
            const encryptedIdString = encryptedId.toString()

            res.cookie('userId', encryptedIdString)
            res.redirect('/social/profile')
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

router.get('/changePass', (req, res) => {
    res.render('social/changePass', {
        message: req.query.message ? req.query.message : null,
        user: res.locals.user
    })
})

router.get('/results'), async (req, res) => {
    try{
        const users = await db.user.findAll({
            where: {
                username: req.body.username
            }
        })
        res.render('social/results', {
            users: users,
            user: res.locals.user
        })
    } catch(err) {
        console.log(err)
        res.status(500).send('error 4')
    }
}

router.get('/profile', async (req, res) => {
    if (!res.locals.user){
        res.redirect('/social/login?message=You must authenticate before you are authorized to view this resource.')
    } else {
        const artwork = await db.artwork.findAll({
            where: {
                userId: res.locals.user.id
            }
        })
        res.render('social/profile', {
            artwork: artwork,
            message: req.query.message ? req.query.message : null,
            user: res.locals.user
        })
    }
})

router.delete('/profile', async (req, res) => {
    try {
            await db.user.destroy({
                where: {
                    username: req.body.username
                }
            })
        res.clearCookie('userId')
        res.redirect('/social')
    } catch(err) {
        console.log(err)
        res.status(500).send('error 3')
    }
})

router.post('/:idx', async (req, res) => {
    try {
        const user = await db.user.findOne({
            where: {
                username: req.body.username
            }
        })
        if (!bcrypt.compareSync(req.body.password, user.password)) {
            // if the user's supplied password is incorrect
            res.redirect('/social/changePass?message=Incorrect Old Password')
        } else {
            const hashedPassword = bcrypt.hashSync(req.body.newPass, 12)
            user.password = hashedPassword
            await user.save()
            res.redirect('/social/changePass?message=Password Changed')

        }

        
    } catch(err) {
        console.log(err)
        res.status(500).send('error 2')
    }
})

// export the router
module.exports = router