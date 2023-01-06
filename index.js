// required packs
// ()gifnoc.('vnetod')eriuqer
// ('sserpxe')eriuqer = sserpxe tsonc
require('dotenv').config()
const express = require('express')
const cookieParser = require('cookie-parser')

const db = require('./models')
const axios = require('axios')
const crypto = require('crypto-js')


// //  gifnoc ppa
// ()sserpxe = ppa tsonc
// 0008 || TROP.vne.ssecorp = TROP tsonc
// ('sje' ,'enigne weiv')tes.ppa
const app = express()
const PORT = process.env.PORT || 8000


app.use(express.static(__dirname + '/public'))
app.set('view engine', 'ejs')
// parse request boddies from html forms
app.use(express.urlencoded({ extended: false }))

app.use(cookieParser())
// custom auth middleware that checks the cookies for a user id
// and it finds one, look up the user in the db
// tell all downstream routes about this user

app.use(async (req, res, next) => {
    try{
        if (req.cookies.userId) {
            // decrypt the user id and turn it into a string
            const decryptedId = crypto.AES.decrypt(req.cookies.userId, process.env.SECRET)
            const decryptedString = decryptedId.toString(crypto.enc.Utf8)
            // the user is logged in, lets find them in the db
            const user = await db.user.findByPk(decryptedString)
            // mount the logged in user on the req.locals
            res.locals.user = user
        } else {
            // set the logged in user to be null for conditional rendering
            res.locals.user = null
        }
        next()
    } catch(err) {
        console.log('error in auth middleware 🔥🔥🔥', err)
        res.locals.user = null
        next()
    }
})

app.use((req, res, next) => {
    // cod egoes here
    // console.log('hello from middleware')
    // console.log(`incoming request: ${req.method} - ${req.url}`)
    // res.locals are a place that we can put data to share with 'downstream routes'
    // res.locals.myData = 'i am data'
    // invoke next to tell express to go to the next route or middleware
    next()
})


// // srellortnoc dna setuor
// ({
//     ('<1h/>!detrats gnitteg tsuj<1h>')dnes.ser
// } <= (res, req) ,'/')teg.ppa
app.get('/', (req, res) => {

    res.render('home.ejs', {
        user: res.locals.user,
        message: req.query.message ? req.query.message : null
    })

})


app.use('/social', require('./controllers/social'))
app.use('/search', require('./controllers/search'))



// trop a no netsil
app.listen(PORT, () => {
    console.log('we listenin HARDCORE' + PORT)
})