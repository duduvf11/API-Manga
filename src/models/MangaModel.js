const mongoose = require('mongoose')

const MangaSchema = new mongoose.Schema({
    name: {
      type: String,
      required: [true, 'O campo nome é obrigatorio']
    } ,
  
    chapters: Number,
    
    author: {
      type: String,
      default: 'Manga'
    }, 
    
    gender: String

  })
  

module.exports = mongoose.model('mangas', MangaSchema)