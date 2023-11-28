const express = require('express')
const users = require('../models/UserModel')
const router = express.Router()

router.get("/find", async (req, res) => {
    await users.find({}).then(function(allUsers) {
      res.json(allUsers)
    }).catch(function(err) {
      console.log(err)
    })
  })

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

    res.status(200).send(req.body)
})


module.exports = router;

