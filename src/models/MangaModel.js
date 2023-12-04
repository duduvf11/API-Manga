const mongoose = require('mongoose')

const MangaSchema = new mongoose.Schema({
    title: {
      type: String,
      required: [true, 'O campo nome é obrigatorio']
    } ,
  
    volume: Number,
    
    author: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'autors',
      required: [true, 'O campo autor é obrigatório']
    },

    type: {
      type: mongoose.Schema.Types.ObjectId, 
      ref: "tipos",
      required:[true, 'O manga precisa ter no minimo 1 tipo']
    },
    
    genre: {
      type: mongoose.Schema.Types.ObjectId, 
      ref: "generos",
      required:[true, 'O manga precisa ter no minimo 1 genêro']
    }

  })
  

module.exports = mongoose.model('mangas', MangaSchema)