const express = require('express')
const User = require('../models/user')
const router = express.Router()

router.post('/cadastrar', async (req, res) => {
  const { userName } = req.body

  try {
    if (await User.findOne({ userName })) { 
      return res.status(400).send({ error: 'Usuário já cadastrado' })
    }
    
    const user = await User.create(req.body)
    user.password = undefined
    return res.send({ user })
  } catch(e) {
    return res.status(400).send({ error: 'Falha no cadastro: ' + e })
  }
})

module.exports = app => app.use('/auth', router)