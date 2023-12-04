const mongoose = require('mongoose')

const AutorSchema = new mongoose.Schema({
    nome: {
      type: String,
      required: [true, 'O campo nome é obrigatorio']
    },
  
    nacionalidade: {
      type: String,
      required: [true, 'O campo nacionalidade é obrigatorio']
    },

    trabalhos: [{
      type: mongoose.Schema.Types.ObjectId,
      ref: 'mangas',
      required:[true, 'O autor precisa ter no minimo 1 obra']
    }]
})

module.exports = mongoose.model('autors', AutorSchema)
