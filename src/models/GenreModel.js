const mongoose = require('mongoose')

const GeneroSchema = new mongoose.Schema({
    genre: {
      type: String,
      required: [true, 'É obrigátorio ter pelos menos um gênero']
    },

    mangas: [{
      type: mongoose.Schema.Types.ObjectId,
      ref: 'mangas', // Referência à coleção Manga
      required: [true, 'O gênero precisa ter no mínimo 1 manga']
    }]
})

module.exports = mongoose.model('generos', GeneroSchema)
