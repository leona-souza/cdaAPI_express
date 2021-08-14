const express = require('express')
const router = express.Router()
const authMiddleware = require('../middlewears/auth')

const Crime = require('../models/crime')

router.get('/', authMiddleware, async (req, res) => {
  try {
    const crimes = await Crime
      .find()
      .populate(['createUser', 'updateUser', 'status'])
    res.send(crimes)
  } catch (e) {
    res.status(400).send({ error: 'Erro ao listar os crimes. ' + e })
  }
})

router.get('/:crimeId', authMiddleware, async (req, res) => {
  try {
    const crime = await Crime
      .findById(req.params.crimeId)
      .populate(['createUser', 'updateUser', 'status'])
    res.send(crime)
  } catch (e) {
    res.status(400).send({ error: 'Erro ao listar o crime. ' + e })
  }
})

router.post('/', authMiddleware, async (req, res) => {
  try {
    const crime = await Crime.create({ ...req.body, createUser: req.userId})
    res.send(crime)
  } catch (e) {
    res.status(400).send({ error: 'Erro ao cadastrar um novo crime. ' + e })
  }
})

router.put('/:crimeId', authMiddleware, async (req, res) => {
  try {
    const crime = await Crime
      .findByIdAndUpdate(
        req.params.crimeId,
        { ...req.body, updateUser: req.userId, updateDate: Date.now() },
        { new: true }
      )
    res.send(crime)
  } catch (e) {
    res.status(400).send({ error: 'Erro ao cadastrar um novo crime. ' + e })
  }
})

router.delete('/:crimeId', authMiddleware, async (req, res) => {
  try {
    await Crime.findByIdAndRemove(req.params.crimeId)
    res.send()
  } catch (e) {
    res.status(400).send({ error: 'Erro ao excluir o crime. ' + e })
  }
})

module.exports = app => app.use('/crimes', router)