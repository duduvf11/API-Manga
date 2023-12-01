const mongoose = require('mongoose')

const MangaSchema = new mongoose.Schema({
    title: {
      type: String,
      required: [true, 'O campo nome é obrigatorio']
    } ,
  
    volume: Number,
    
    author: {
      type: String,
      required:[true, 'O campo autor é obrigatorio']
    },

    type: {
      type: String,
      required:[true, 'O campo tipo é obrigatorio']
    },
    
    genre: {
      type: String,
      required:[true, 'O manga precisa requer no minimo 1 gênero']
    }

  })
  

module.exports = mongoose.model('mangas', MangaSchema)