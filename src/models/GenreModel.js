const mongoose = require('mongoose')

const GeneroSchema = new mongoose.Schema({
    nome: {
      type: String,
      required: [true, 'O campo nome é obrigatório']
    },
  
    descricao: {
      type: String,
      required: [true, 'O campo descrição é obrigatório']
    }
})

module.exports = mongoose.model('generos', GeneroSchema)
