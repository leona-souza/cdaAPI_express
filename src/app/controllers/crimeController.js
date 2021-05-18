const express = require('express')
const router = express.Router()
const authMiddleware = require('../middlewears/auth')

router.get('/', authMiddleware, (req, res) => {
  res.send({ ok: true, user: req.userId })
})

module.exports = app => app.use('/crimes', router)