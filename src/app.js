require('dotenv/config')

const express = require('express')
const cors = require('cors')
const morgan = require('morgan')
const routes = require('./routes')
const app = express()

app.use(morgan(':method :url :status :res[content-length] - :response-time ms'))
app.use(cors())
app.use(express.json())

app.use('/v1', routes)

app.use((err, req, res, next) => {
  res.status(500).send({ error: err.message })
})

module.exports = {
  run: () => {
    app.listen(process.env.PORT, (error) => {
      if (!error) {
        console.log(`> Running at ${process.env.PORT} port 🚀`)
      }
    })
  }
}
