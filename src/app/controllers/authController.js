require('dotenv/config')
const express = require('express')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const User = require('../models/user')
const router = express.Router()
const hashJWT = process.env.hashJWT
const tokenLife = process.env.tokenLife

function gerarToken(params = {}) {
  return jwt.sign(params, hashJWT, {
    expiresIn: tokenLife
  })
}

router.post('/cadastrar', async (req, res) => {
  const { userName } = req.body

  try {
    if (await User.findOne({ userName })) { 
      return res.status(400).send({ error: 'Usuário já cadastrado' })
    }
    const user = await User.create(req.body)
    user.password = undefined

    return res.send({ 
      user, 
      token: gerarToken({ id: user.id })
    });
  } catch(e) {
    return res.status(400).send({ error: 'Falha no cadastro: ' + e })
  }
})//end post/cadastrar

router.post('/authenticate', async (req, res) => {
  const { userName, password } = req.body
  const user = await User.findOne({ userName }).select('+password')
  if (!user) {
    res.statusMessage = 'Usuário não encontrado'
    return res.status(400).end()
  }

  if (!await bcrypt.compare(password, user.password)) {
    res.statusMessage = 'Senha incorreta'
    return res.status(400).end()
  }

  user.password = undefined

  res.send({ 
    user, 
    token: gerarToken({ id: user.id })
  });
})//end post/authenticate

module.exports = app => app.use('/auth', router)
