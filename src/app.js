require('dotenv/config')

const express = require('express')
const cors = require('cors')
const routes = require('./routes')

const app = express()

app.use(cors())
app.use(express.json())

app.use('/v1', routes)

module.exports = {
  run: () => {
    app.listen(process.env.PORT, (error) => {
      if (!error) {
        console.log(`> Running at ${process.env.PORT} port 🚀`)
      }
    })
  }
}
