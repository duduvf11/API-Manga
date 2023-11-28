const mongoose = require('mongoose')

const UserSchema = new mongoose.Schema({

    email:{
      type: String,
      required: [true, 'O campo e-mail é obrigatorio'],
      unique: [true, 'Esse email já foi cadastrado']
    },

    name: {
      type: String,
      required: [true, 'O campo nome é obrigatorio'],
      unique: [true, 'O nome de usuario já existe']
    } ,
  
    password: {
      type: String,
      required: [true, 'O campo senha é obrigatorio']
    } , 
    
    admin: {
      type: Boolean,
      default: false
    }, 
    
    token: String

  })
  
module.exports = mongoose.model('users', UserSchema)