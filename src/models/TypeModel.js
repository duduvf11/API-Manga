const mongoose = require('mongoose')

const TipoSchema = new mongoose.Schema({
    nome: {
      type: String,
      enum: ['manga', 'manhwa', 'manhua'],
      required: [true, 'O campo nome é obrigatório']
    },
  
})

module.exports = mongoose.model('tipos', TipoSchema)
