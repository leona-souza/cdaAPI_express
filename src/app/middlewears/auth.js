require('dotenv/config')
const jwt = require('jsonwebtoken')
const hashJWT = process.env.hashJWT

module.exports = (req, res, next) => {
  const authHeader = req.headers.authorization

  if (!authHeader) {
    return res.status(401).send({ error: 'O token não foi especificado' })
  }

  const partes = authHeader.split(' ')

  if (partes.length !== 2) {
    return res.status(401).send({ error: 'O formato do token está incorreto' })
  }

  const [ scheme, token ] = partes

  if (!/^Bearer$/i.test(scheme)) {
    return res.status(401).send({ error: 'Token mal formado' })
  }

  jwt.verify(token, hashJWT, (err, decoded) => {
    if (err) {
      return res.status(401).send({ error: 'Token inválido ou vencido' })
    }

    req.userId = decoded.id
    return next()
  })
}
