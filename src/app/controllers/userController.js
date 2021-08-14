const express = require('express')
const router = express.Router()
const authMiddleware = require('../middlewears/auth')
const User = require('../models/user')

router.get('/', authMiddleware, async (req, res) => {
  try {
    const users = await User.find()
    res.send(users)
  } catch (e) {
    res.status(400).send({ error: 'Erro ao listar os usuários. ' + e })
  }
})

router.get('/:usuarioId', authMiddleware, async (req, res) => {
  try {
    const user = await User
      .findById(req.params.usuarioId)
    res.send(user)
  } catch (e) {
    res.status(400).send({ error: 'Erro ao listar o usuário. ' + e })
  }
})

router.post('/', authMiddleware, async (req, res) => {
  try {
    const user = await User.create(req.body)
    res.send(user)
  } catch (e) {
    res.status(400).send({ error: 'Erro ao postar um novo usuário. ' + e })
  }
})

router.put('/:usuarioId', authMiddleware, async (req, res) => {
  res.send({ user: req.userId })
})

router.delete('/:usuarioId', authMiddleware, async (req, res) => {
  res.send({ user: req.userId })
})

module.exports = app => app.use('/users', router)