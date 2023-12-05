const mongoose = require('mongoose')
const mangas = require('./MangaModel')

const AuthorSchema = new mongoose.Schema({
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
      ref: 'mangas'
    }]
})

AuthorSchema.pre('save', async function(next) {
  const author = this;

  try {
    const mangas = await mongoose.model('mangas').find({_id: {$in: author.trabalhos}});

    const allMangasHaveThisAuthor = mangas.every(function(manga) {
      return manga.author.toString() === author._id.toString();
    });

    if (!allMangasHaveThisAuthor) {
      return next(new Error('Inconsistência: nem todos os mangás neste autor têm este autor'));
    }

    next();
  } catch (err) {
    next(err);
  }
});


module.exports = mongoose.model('authors', AuthorSchema)
