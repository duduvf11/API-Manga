const mongoose = require('mongoose')

const TipoSchema = new mongoose.Schema({
    type: {
      type: String,
      enum: ['manga', 'manhwa', 'manhua'],
      required: [true, 'O campo nome é obrigatório']
    },

    mangas: [{
      type: mongoose.Schema.Types.ObjectId,
      ref: 'mangas',
      required: [true, 'Os tipos precisam ter no mínimo 1 manga']
    }]
  
})

module.exports = mongoose.model('tipos', TipoSchema)
