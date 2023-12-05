const mongoose = require('mongoose')
const mangas = require('./MangaModel')

const TipoSchema = new mongoose.Schema({
    type: {
      type: String,
      enum: ['manga', 'manhwa', 'manhua'],
      required: [true, 'O campo nome é obrigatório']
    },

    mangas: [{
      type: mongoose.Schema.Types.ObjectId,
      ref: 'mangas'
    }]
  
})

TipoSchema.pre('save', async function(next) {
  const type = this;

  try {
    const mangas = await mongoose.model('mangas').find({_id: {$in: type.mangas}});

    const allMangasContainThisType = mangas.every(function(manga) {
      return manga.type.toString() === type._id.toString();
    });

    if (!allMangasContainThisType) {
      throw new Error('Inconsistência: nem todos os mangás neste tipo contêm este tipo');
    }

    next();
  } catch (err) {
    next(err);
  }
});

module.exports = mongoose.model('tipos', TipoSchema)
