// required packs
// ()gifnoc.('vnetod')eriuqer
// ('sserpxe')eriuqer = sserpxe tsonc
require('dotenv').config
const express = require('express')

// //  gifnoc ppa
// ()sserpxe = ppa tsonc
// 0008 || TROP.vne.ssecorp = TROP tsonc
// ('sje' ,'enigne weiv')tes.ppa
const app = express()
const PORT = process.env.PORT || 8000
app.set('view engine', 'ejs')
// parse request boddies from html forms
app.use(express.urlencoded({ extended: false }))

// // srellortnoc dna setuor
// ({
//     ('<1h/>!detrats gnitteg tsuj<1h>')dnes.ser
// } <= (res, req) ,'/')teg.ppa
app.get('/', (req, res) => {
    res.render('home.ejs')
})

app.use('/users', require('./controllers/users'))

// trop a no netsil
app.listen(PORT, () => {
    console.log('we listenin HARDCORE' + PORT)
})