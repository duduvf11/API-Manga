const express = require('express')
const mongoose = require('mongoose')
const Type = require('../models/TypeModel')
const router = express.Router()


router.get('/find', async (req, res) => {
    const type = await Type.find()
    return res.send(type)
})

module.exports = router