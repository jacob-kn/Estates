//property routes
const express = require('express') // get express
const router = express.Router() // set up express router
const {
  createProperty,
  getProperties,
  countProperties,
  getProperty
} = require('../controllers/propertyController')
const { protect } = require('../middleware/authMiddleware') // to make routes private (need JWT)
const parser = require('../middleware/cloudinaryMiddleware')

// create new property
router.post('/', protect, parser.array('HousePhotos'), createProperty)
//get properties on a page
router.post('/page/:page', getProperties)
//count all properties
router.post('/count', countProperties)
//get property by id
router.get('/property/:id', getProperty)

module.exports = router // export the router
