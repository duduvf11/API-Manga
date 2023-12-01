const express = require('express')
const mongoose = require('mongoose')
const Manga = require('../models/MangaModel')
const router = express.Router()


router.get('/', async (req, res) => {
    const manga = await Manga.find()
    return res.send(manga)
})

router.delete("/:id", async(req, res) => {
    const manga = await Manga.findByIdAndDelete(req.params.id)
    return res.send(manga)
})

router.put("/:id", async (req, res) => {
   
    const {title, volume, author, genre, type} = req.body

    const manga = await Manga.findByIdAndUpdate(req.params.id, {
        title,
        volume,
        author,
        genre,
        type
    }, {
        new: true
    })
    return res.send(manga)
})

router.post("/create", async (req, res) => {

    const {title, volume, author, genre, type} = req.body

    const manga = new Manga({
        title,
        volume,
        author,
        genre,
        type
    })
    await manga.save()
    return res.send(manga)
})

module.exports = router