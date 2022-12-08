require('dotenv/config')

const express = require('express')
const cors = require('cors')
const morgan = require('morgan')
const routes = require('./routes')
const https = require('https')
const fs = require('fs')

const app = express()

app.use(morgan(':method :url :status :res[content-length] - :response-time ms'))
app.use(cors())
app.use(express.json())

app.use('/v1', routes)

app.use((err, req, res, next) => {
  res.status(500).send({ error: err.message })
})

if (process.env.HTTPS) {
  const cert = fs.readFileSync(process.env.CERT_PATH)
  const key = fs.readFileSync(process.env.CERT_SECRET_PATH)

  const httpsServer = https.createServer({ key, cert }, app)

  httpsServer.listen(443)
}

module.exports = {
  run: () => {
    app.listen(process.env.PORT, (error) => {
      if (!error) {
        console.log(`> Running at ${process.env.PORT} port 🚀`)
      }
    })
  }
}
