const express = require('express')
const mongoose = require('mongoose')
const userRoute = require('./routes/UserRoute')
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

mongoose.connect(`mongodb+srv://${dbUser}:${dbPassword}@api-manga.l2yy3cg.mongodb.net/`)
.then(() => {
    console.log('Banco de Dados conectado')
    app.listen(port, ()=> {
        console.log(`Servidor rodando`)
    });
}).catch((error) => {
    console.log(error)
})