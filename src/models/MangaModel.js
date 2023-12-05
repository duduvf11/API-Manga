const mongoose = require('mongoose')
const Author = require('./AuthorModel')
const Tipo = require('./TypeModel')
const Genero = require('./GenreModel')

const MangaSchema = new mongoose.Schema({
    title: {
      type: String,
      required: [true, 'O campo nome é obrigatorio']
    } ,
  
    volume: Number,
    
    author: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'authors',
      required: [true, 'O campo autor é obrigatório']
    },

    type: {
      type: mongoose.Schema.Types.ObjectId, 
      ref: "tipos",
      required:[true, 'O manga precisa ter no minimo 1 tipo']
    },
    
    genre: [{
      type: mongoose.Schema.Types.ObjectId, 
      ref: "generos",
      required:[true, 'O manga precisa ter no minimo 1 genêro']
    }]

  })

  MangaSchema.pre('find', function(next) {
    this.populate('author');  // Use o nome do campo relacionado, no caso, 'author'
    this.populate('type');
    this.populate('genre');
    next();
})

module.exports = mongoose.model('mangas', MangaSchema)