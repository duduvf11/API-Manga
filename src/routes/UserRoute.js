const express = require('express')
const users = require('../models/UserModel')
const router = express.Router()
const jwt = require('jsonwebtoken');
const mongoose = require('mongoose');
require('dotenv').config()

router.get("/find", async (req, res) => {
    await users.find({}).then(function(allUsers) {
      res.json(allUsers)
    }).catch(function(err) {
      console.log(err)
    })
  })

//Rota Privada
router.get('/:id', checkToken, async (req, res) => {
  
        const id = req.params.id;
        
        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({ msg: 'ID de usuário inválido' });
        }
        // checar se o usuário existe
        const user = await users.findById(id, '-password');

        res.status(200).json({user})

})

function checkToken( req, res, next) {

    const authHeader = req.headers['authorization']
    const token = authHeader?.split(" ")[1]

    if(!token){
        return res.status(401).json({msg: "Acesso Negado!"})
    }

    try {
        const secret = process.env.SECRET

        jwt.verify(token, secret)
        
        next()
    } catch (error) {
        res.status(400).json({msg: "Token Invalido!"})
    }
}

async function isAdmin(req, res, next) {
    const id = req.params.id
    console.log(id)
         
    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).json({ msg: 'ID de usuário inválido' });
    }
    
    const user = await users.findById(id, '-password');
    console.log(user.admin)
    if(user.admin == false){
        return res.status(200).json({msg: 'Acesso negado. Você não é administrador'})
    } else {
        next()
    }

}
    
 router.get('/admin/:id', checkToken, isAdmin, async (req, res) => {
        
    const id = req.params.id;
        
    if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({ msg: 'ID de usuário inválido' });
    }

    const user = await users.findById(id, '-password');
    res.status(200).json({user})

  });

router.post('/auth/register', async (req, res) => {

    const {name, email, password, confirmpassword} = req.body

    if(!name){
        return res.status(422).json({msg: 'O nome é obrigatorio!'})
    }
    
    if(!email){
        return res.status(422).json({msg: 'O email é obrigatorio!'})
    }
    
    if(!password){
        return res.status(422).json({msg: 'A senha é obrigatoria!'})
    }

    if(password !== confirmpassword){
        return res.status(422).json({msg: 'As senhas não conferem!'})
    }

    //checa se o usuario ja existe
    const userExists = await users.findOne({email: email})
    
    if(userExists){
        return res.status(422).json({msg: 'Por favor, utilize outro e-mail!'})
    }

    const user = new users({
        name,
        email,
        password
    })

    try {
        await user.save()

        res.status(201).json({msg: 'Usuario criado com sucesso!.'})
    } catch (error) {
        console.log(error)

        res.status(500).json({msg: 'Aconteceu um erro no servidor.'})
    }

})

router.post('/auth/login', async (req, res) =>{

    const{email, password} = req.body
    
    if(!email){
        return res.status(422).json({msg: 'O email é obrigatorio!'})
    }
    
    if(!password){
        return res.status(422).json({msg: 'A senha é obrigatoria!'})
    }
    
    //checa se o usuario nao existe
    const user = await users.findOne({email: email})
    
    if(!user){
        return res.status(404).json({msg: 'Usuario não encontrado!'})
    }

    if(user.password != req.body.password){
        return res.status(422).json({msg: 'Senha incorreta!'})
    }

    try {
        
        const secret = process.env.SECRET
        const token = jwt.sign({
            id: user._id,
            },
            secret,
        )

        res.status(200).json({msg: "Autenticação realizada com sucesso!", token})
    } catch (error) {
        console.log(error)

        res.status(500).json({msg: 'Aconteceu um erro no servidor.'})
    }

})


module.exports = router;

