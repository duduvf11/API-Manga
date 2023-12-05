const mongoose = require('mongoose')
const mangas = require('./MangaModel')

const GeneroSchema = new mongoose.Schema({
    genre: {
      type: String,
      required: [true, 'É obrigátorio ter pelos menos um gênero']
    },

    mangas: [{
      type: mongoose.Schema.Types.ObjectId,
      ref: 'mangas'
    }]
})

GeneroSchema.pre('save', async function(next) {
  const genre = this;

  try {
    const mangas = await mongoose.model('mangas').find({_id: {$in: genre.mangas}});

    const allMangasContainThisGenre = mangas.every(function(manga) {
      return genreId.toString() === genre._id.toString();
    });

    if (!allMangasContainThisGenre) {
      return next(new Error('Inconsistência: nem todos os mangás neste gênero contêm este gênero'));
    }

    next();
  } catch (err) {
    next(err);
  }
});

module.exports = mongoose.model('generos', GeneroSchema)
