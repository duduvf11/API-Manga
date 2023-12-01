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
    const manga = await Manga.findByIdAndUpdate(req.params.id, {
        titulo: req.body.titulo,
        autor: req.body.autor,
        genero: req.body.genero,
        volumes: req.body.volumes,
    }, {
        new: true
    })
    return res.send(manga)
})

router.post("/", async (req, res) => {
    const manga = new Manga({
        titulo: req.body.titulo,
        autor: req.body.autor,
        genero: req.body.genero,
        volumes: req.body.volumes,
    })
    await manga.save()
    return res.send(manga)
})

module.exports = router