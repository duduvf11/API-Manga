const express = require('express')
const mongoose = require('mongoose')
const Author = require('../models/AuthorModel')
const router = express.Router()


router.get('/find', async (req, res) => {
    const author = await Author.find()
    return res.send(author)
})

router.post('/create', async (req, res) =>{

    const {nome, nacionalidade, trabalhos} = req.body

    if(!nome){
        return res.status(422).json({msg: 'O nome é obrigatorio!'})
    }

    if(!nacionalidade){
        return res.status(422).json({msg: 'A nacionalidade é obrigatoria!'})
    }

    const authorExists = await Author.findOne({nome: nome})

    if(authorExists){
        return res.status(422).json({msg: 'Por favor, utilize outro nome!'})
    }

    const author = new Author({
        nome,
        nacionalidade,
        trabalhos
    })

    try {
        await author.save()

        res.status(201).json({msg: 'Autor criado com sucesso!.'})
    } catch (error) {
        console.log(error)

        res.status(500).json({msg: 'Aconteceu um erro no servidor.'})
    }
    

})

router.put('/update/:id', async (req, res) => {

    const {nome, nacionalidade, trabalhos} = req.body

    if(!nome){
        return res.status(422).json({msg: 'O nome é obrigatorio!'})
    }

    if(!nacionalidade){
        return res.status(422).json({msg: 'A nacionalidade é obrigatoria!'})
    }

    const authorExists = await Author.findOne({nome: nome})

    if(!authorExists){
        return res.status(422).json({msg: 'Autor não encontrado!'})
    }

    const author = await Author.findByIdAndUpdate(req.params.id, {
        nome,
        nacionalidade,
        trabalhos,
    }, {
        new: true
    })
    return res.send(author)

})

module.exports = router