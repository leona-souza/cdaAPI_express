const express = require('express')
const cors = require('cors')
const app = express()

app.use(express.json())
app.use(cors())
app.use(express.urlencoded({ extended: false }))

require('../src/app/controllers/index')(app)

app.listen(5000)