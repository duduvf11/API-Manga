const express = require('express')
const mongoose = require('mongoose')
const userRoute = require('./routes/UserRoute')
const mangaRoute = require('./routes/MangaRoute')
const authorRoute = require('./routes/AuthorRoute')
const typeRoute = require('./routes/TypeRoute')
const genreRoute = require('./routes/GenreRoute')

const mangas = require("./models/MangaModel")
const authors = require("./models/AuthorModel")
const generos = require("./models/GenreModel")
const tipos = require("./models/TypeModel")

require('dotenv').config()

const app = express()
app.use(express.json())

const port = process.env.PORT
const dbUser = process.env.DB_USER
const dbPassword = process.env.DB_PASS

//Rota Publica
app.get('/', (req, res) =>{
  res.status(200).send({msg:"Bem-vindo a minha API!"})
})

app.use("/usuario", userRoute);
app.use("/manga", mangaRoute);
app.use("/autor", authorRoute);
app.use("/tipo", typeRoute);
app.use("/genero", genreRoute);

app.get('/install', async (req, res) => {
    try {

        const autoresCount = await authors.countDocuments();
        const tiposCount = await tipos.countDocuments();
        const generosCount = await generos.countDocuments();
        const mangasCount = await mangas.countDocuments();

        if (autoresCount > 0 && tiposCount > 0 && generosCount > 0 && mangasCount > 0) {
            return res.json({ success: false, message: 'O banco de dados já está instalado.' });
        }

        const Autores = await authors.create([
            { nome: 'Chu-Gong', nacionalidade: 'Sul-coreano' },
            { nome: 'Yusuke Nomura', nacionalidade: 'Japonês' },
            { nome: 'Takeruo Hokazono', nacionalidade: 'Japonês' },
            { nome: 'Momo', nacionalidade: 'Chinês' },
        ]); 

        const Tipos = await tipos.create([
            { type: 'manga' },
            { type: 'manhwa' },
            { type: 'manhua' },
        ]);

        const Generos = await generos.create([
            { genre: 'Ação' },
            { genre: 'Esporte' },
            { genre: 'Shounen'},
            { genre: 'Sobrenatural'},
            { genre: 'Drama'},
            { genre: 'Artes Marcias'}
        ]);

        const Mangas = await mangas.create([
            { title: 'Dolly Kill Kill', volume: 153, author: Autores[1]._id, type: Tipos[0]._id, genre: [Generos[0]._id, Generos[2]._id] },
            { title: 'Solo Leveling', volume: 200, author: Autores[0]._id, type: Tipos[1]._id, genre:[Generos[0]._id, Generos[2]._id, Generos[4]._id]},
            { title: 'Martial Peak', volume: 3630, author: Autores[3]._id, type: Tipos[2]._id, genre: [Generos[0]._id, Generos[2]._id, Generos[5]._id, Generos[3]._id] },
            { title: 'Blue Lock', volume: 243, author: Autores[1]._id, type: Tipos[0]._id, genre: [Generos[0]._id, Generos[1]._id, Generos[2]._id] },
            { title: 'Kagurabachi', volume: 12, author: Autores[2]._id, type: Tipos[0]._id, genre:[Generos[2]._id, Generos[3]._id, Generos[0]._id]},
        ]);

        for (let manga of Mangas) {
            const author = await authors.findById(manga.author);
            const type = await tipos.findById(manga.type);
        
            if (author) {
                await authors.updateOne({_id: manga.author}, {$push: {trabalhos: manga._id}});
            }
        
            if (type) {
                await tipos.updateOne({_id: manga.type}, {$push: {mangas: manga._id}});
            }
        
            for (let genreId of manga.genre) {
                const genre = await generos.findById(genreId);
        
                if (genre) {
                    await generos.updateOne({_id: genreId}, {$push: {mangas: manga._id}});
                }
            }
        }

        res.json({ success: true, message: 'Instalação concluída com sucesso!' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: 'Erro na instalação do banco de dados.' });
    }
});


mongoose.connect(`mongodb+srv://${dbUser}:${dbPassword}@api-manga.l2yy3cg.mongodb.net/`)
.then(() => {
    console.log('Banco de Dados conectado')
    app.listen(port, ()=> {
        console.log(`Servidor rodando`)
    });
}).catch((error) => {
    console.log(error)
})
