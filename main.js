'use strict'

const express = require('express')
const layouts = require('express-ejs-layouts')
const mongoose = require('mongoose')

const homeController = require('./controllers/homeController')
const errorController = require('./controllers/errorController')

const Subscriber = require('./models/subscriber')

const dburl = 'mongodb://localhost:27017/recipe_db'

mongoose.connect(dburl, { useNewUrlParser: true })
const db = mongoose.connection

db.once('open', () => {
  console.log('Successfully connected to MongoDB using Mongoose')
})

var myQuery = Subscriber.findOne({
  name: 'Jon Wexler'
})
  .where('email', /wexler/)
myQuery.exec((error, data) => {
  if (error) throw error
  if (data) console.log(data.name)
})

/*
var subscriber1 = new Subscriber({
  name: 'Jon Wexler',
  email: 'jon@jonwexler.com'
})

subscriber1.save((error, savedDocument) => {
  if (error) console.log(error)
  console.log(savedDocument)
})

Subscriber.create(
  {
    name: 'Jon Wexler',
    email: 'jon@jonwexler.com'
  },
  function (error, savedDocument) {
    if (error) console.log(error)
    console.log(savedDocument)
  }
)
*/

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
app.get('/contact', homeController.showSignUp)
app.post('/contact', homeController.postedSignUpForm)

app.use(errorController.pageNotFoundError)
app.use(errorController.internalServerError)

app.listen(app.get('port'), () => {
  console.log(
    `Server running at http://localhost:${app.get('port')}`
  )
})
