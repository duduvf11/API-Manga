const express = require('express')
const mongoose = require('mongoose')
const Genre = require('../models/GenreModel')
const router = express.Router()

router.get('/find', async (req, res) => {
    const genre = await Genre.find()
    return res.send(genre)
})

router.post('/create', async (req, res) =>{

    const {genre, mangas} = req.body

    if(!genre){
        return res.status(422).json({msg: 'O nome é obrigatorio!'})
    }

    if(!mangas){
        return res.status(422).json({msg: 'A nacionalidade é obrigatoria!'})
    }

    const genreExists = await Genre.findOne({genre: genre})

    if(genreExists){
        return res.status(422).json({msg: 'Por favor, utilize outro nome!'})
    }

    const genres = new Genre({
        genre,
        mangas
    })

    try {
        await genres.save()

        res.status(201).json({msg: 'Genêro criado com sucesso!'})
    } catch (error) {
        console.log(error)

        res.status(500).json({msg: 'Aconteceu um erro no servidor.'})
    }
    
})

module.exports = router