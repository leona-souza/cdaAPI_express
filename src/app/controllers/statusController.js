const express = require('express')
const router = express.Router()
const authMiddleware = require('../middlewears/auth')
const Status = require('../models/status')

router.get('/', authMiddleware, async (req, res) => {
  try {
    const statuses = await Status.find()
    res.send(statuses)
  } catch (e) {
    res.status(400).send({ error: 'Erro ao listar os status. ' + e })
  }
})

router.get('/:statusId', authMiddleware, async (req, res) => {
  res.send({ user: req.userId })
})

router.post('/', authMiddleware, async (req, res) => {
  try {
    const status = await Status.create(req.body)
    res.send(status)
  } catch (e) {
    res.status(400).send({ error: 'Erro ao postar um novo status. ' + e })
  }
})

router.put('/:statusId', authMiddleware, async (req, res) => {
  res.send({ user: req.userId })
})

router.delete('/:statusId', authMiddleware, async (req, res) => {
  res.send({ user: req.userId })
})

module.exports = app => app.use('/status', router)