const express = require('express')
const db = require('../models')
const router = express.Router()
const axios = require('axios')
const crypto = require('crypto-js')
const bcrypt = require('bcrypt')

router.get('/', async (req, res) => {
    try {
        const url = `https://collectionapi.metmuseum.org/public/collection/v1/search?hasImages=true&q=${req.query.search}`
        const response = await axios.get(url)
        // console.log(response.data)
        let titleIDs = []
        if (response.data.total !== 0) {
        response.data.objectIDs.forEach(e => titleIDs = [...titleIDs, axios.get(`https://collectionapi.metmuseum.org/public/collection/v1/objects/${e}`)])
        titleIDs = await Promise.all(titleIDs)
        // console.log(titleIDs)
        } 


        // const titles = await axios.get(`https://collectionapi.metmuseum.org/public/collection/v1/objects/${response.data.objectIDs}`)
        // console.log(titles.data.title, titles.data.artistDisplayName, titles.data.primaryImage)
        res.render('search/results.ejs', {
            user: res.locals.user,
            search: req.query.search,
            result: response.data,
            titles: titleIDs
            
            })
        
        // res.json(response.data)
    } catch(err) {
        console.log(err)
        res.status(500).send('api error')
    }
    
})

router.post('/', async (req, res) => {
    try{
        const artwork = await db.artwork.findOrCreate({
            where: {
                id: req.body.id,
                userId: req.body.userId,
                artist: req.body.artist,
                title: req.body.title,
                link: req.body.link
            }
        })
        // console.log(artwork)
        res.redirect('/social/profile?message=Successfully Added to Favorites')
    } catch(err) {
        console.log(err)
        res.status(500).send('error 5')
    }
})


router.post('/comment', async (req, res) => {
    try {
        const comment = await db.comment.findOrCreate({
            where: {
                userId: req.body.userId,
                artworkId: req.body.artworkId,
                content: req.body.content
            }
        })
        res.redirect(`/search/${req.body.artworkId}`)
    } catch(err) {
        console.log(err)
        res.status(500).send('error 4')
    }
})


router.delete('/comment', async (req, res) => {
    try {
        const comment = db.comment.destroy({
            where: {
                content: req.body.content
            }
        })
        res.redirect(`/search/${req.body.artworkId}`)
    } catch(err) {
        console.log(err)
        res.status(500).send('error 6')
    }
})


router.delete('/:idx', async (req, res) => {
    try{
        const remove = await db.artwork.destroy({
            where: {
                id: req.params.idx
            }
        })
        res.redirect('/social/profile')
    }catch(err) {
        console.log(err)
    }
})
router.get('/:idx', async (req, res) => {
    try {
        const artworkId = req.params.idx
        const comments = await db.comment.findAll({
            where: {
                artworkId: artworkId
            },
            include: [db.user]
        })
        console.log(comments)
        // console.log(res.locals.user, comments)
        const url = `https://collectionapi.metmuseum.org/public/collection/v1/objects/${req.params.idx}`
        // console.log(req.params.idx)
        const response = await axios.get(url)
        res.render('search/single.ejs', {
            item: response.data,
            user: res.locals.user,
            artworkId: artworkId,
            comments: comments 
        })
        // res.json(response.data)
    } catch(err) {
        console.log(err)
        res.status(500)
    }
})






module.exports = router