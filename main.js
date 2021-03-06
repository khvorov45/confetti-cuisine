'use strict'

const express = require('express')
const layouts = require('express-ejs-layouts')
const mongoose = require('mongoose')

const homeController = require('./controllers/homeController')
const errorController = require('./controllers/errorController')
const subscribersController = require(
  './controllers/subscribersController'
)

mongoose.Promise = global.Promise

const dburl = 'mongodb://localhost:27017/recipe_db'

mongoose.connect(dburl, { useNewUrlParser: true, useUnifiedTopology: true })
const db = mongoose.connection

db.once('open', () => {
  console.log('Successfully connected to MongoDB using Mongoose')
})

const app = express()

app.set('port', process.env.PORT || 3000)
app.set('view engine', 'ejs')

app.use(layouts)

app.use(
  express.urlencoded({
    extended: false
  })
)
app.use(express.json())

app.use(express.static('public'))

app.get('/', homeController.showHome)
app.get('/courses', homeController.showCourses)
app.get('/contact', subscribersController.getSubscriptionPage)
app.post('/subscribe', subscribersController.saveSubscriber)
app.get('/subscribers', subscribersController.getAllSubscribers)

app.use(errorController.pageNotFoundError)
app.use(errorController.internalServerError)

app.listen(app.get('port'), () => {
  console.log(
    `Server running at http://localhost:${app.get('port')}`
  )
})
