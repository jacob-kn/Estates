//entry point to server
console.log('Estates server.js running')

const path = require('path')
const colors = require('colors')
const connectDB = require('./config/db') // require the db file to acces mongodb
connectDB() //set up a donnection to the database

//set up values to sue in server
const express = require('express') // get express
const dotenv = require('dotenv').config() // use dotenv to load environment variables from .env file.
const { errorHandler } = require('./middleware/errorMiddleware') // my errorhandler system that replaces the defualt

const port = process.env.PORT || 8000 // or 8000 if the enviroment variable in .env isn't available
const app = express() // app represents express stuff
app.use(express.json()) // very important to parse requests from Post, Get etc
app.use(express.urlencoded({ extended: false })) // need this for the type coming accross

// setup cors middleware
const cors = require('cors')
app.use(cors())

//routes/endpoints
app.use('/api/users', require('./routes/userRoutes')) // all user routes
app.use('/api/properties', require('./routes/propertyRoutes')) // property routes
app.use('/api/agreements', require('./routes/agreementRoutes')) // agreement routes
app.use('/api/fee', require('./routes/feeRoutes')) // fee routes

// serve frontend
if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, '../frontend/build')))

  app.get('*', (req, res) =>
    res.sendFile(
      path.resolve(__dirname, '../', 'frontend', 'build', 'index.html')
    )
  )
} else {
  app.get('/', (req, res) => res.send('Please set to production'))
}

app.use(errorHandler) // override default error handlers

//listen() function is used to bind and listen the connections on the specified host and port.
app.listen(port, () =>
  console.log('server started on http://localhost:' + port.blue.bold)
)

console.log('Server is Active'.blue.bold)
