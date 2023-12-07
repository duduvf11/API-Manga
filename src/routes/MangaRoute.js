const express = require('express')
const mongoose = require('mongoose')
const Manga = require('../models/MangaModel')
const router = express.Router()


router.get('/find', async (req, res) => {
    const manga = await Manga.find()
    return res.send(manga)
})

router.delete("/delete/:id", async(req, res) => {
    const manga = await Manga.findByIdAndDelete(req.params.id)
    return res.send(manga)
})

router.put("/update/:id", async (req, res) => {
   
    const {title, volume, author, genre, type} = req.body

    if(!title){
        return res.status(422).json({msg: 'O titulo é obrigatorio!'})
    }
    
    if(!volume){
        return res.status(422).json({msg: 'O campo volume é obrigatorio!'})
    }
    
    if(!author){
        return res.status(422).json({msg: 'O campo autor é obrigatório'})
    }

    if(!genre){
        return res.status(422).json({msg: 'É obrigátorio ter pelos menos um gênero!'})
    }

    if(!type){
        return res.status(422).json({msg: 'O tipo é obrigatorio!'})
    }

    const mangaExists = await Manga.findOne({title: title})
    
    if(!mangaExists){
        return res.status(422).json({msg: 'Manga não encontrado!'})
    }

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

    if(!title){
        return res.status(422).json({msg: 'O titulo é obrigatorio!'})
    }
    
    if(!volume){
        return res.status(422).json({msg: 'O campo volume é obrigatorio!'})
    }
    
    if(!author){
        return res.status(422).json({msg: 'O campo autor é obrigatório'})
    }

    if(!genre){
        return res.status(422).json({msg: 'É obrigátorio ter pelos menos um gênero!'})
    }

    if(!type){
        return res.status(422).json({msg: 'O tipo é obrigatorio!'})
    }

    const mangaExists = await Manga.findOne({title: title})
    
    if(mangaExists){
        return res.status(422).json({msg: 'Por favor, utilize outro nome!'})
    }

    const manga = new Manga({
        title,
        volume,
        author,
        genre,
        type
    })

    try {
        await manga.save()

        res.status(201).json({msg: 'Manga criado com sucesso!.'})
    } catch (error) {
        console.log(error)

        res.status(500).json({msg: 'Aconteceu um erro no servidor.'})
    }
})

router.patch('/update/volumes/:id', async (req, res)=>{

    const { volume } = req.body;

    if (!volume) {
        return res.status(422).json({ msg: 'O campo volume é obrigatório para a atualização!' });
    }

    try {

        const manga = await Manga.findById(req.params.id);

        if (!manga) {
            return res.status(404).json({ msg: 'Manga não encontrado!' });
        }

        manga.volume = volume;

        const updatedManga = await manga.save();

        return res.json(updatedManga);
    } catch (error) {
        console.error(error.message);
        return res.status(500).send('Erro no servidor');
    }
})

module.exports = router