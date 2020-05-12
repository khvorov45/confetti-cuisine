"use strict";

const express = require('express')

const homeController = require('./controllers/homeController')

const app = express()

app.set("port", process.env.PORT || 3000)

app.use(
  express.urlencoded({
    extended: false
  })
)
app.use(express.json())

app.get('/', (req, res) => {
  res.send('Welcome to Confetti Cuisine')
})

app.listen(app.get('port'), () => {
  console.log(
    `Server running at http://localhost:${app.get('port')}`
  )
})
