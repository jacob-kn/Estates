//property routes
const express = require('express') // get express
const router = express.Router() // set up express router
const {
  createProperty,
  getProperties
} = require('../controllers/propertyController')
const { protect } = require('../middleware/authMiddleware') // to make routes private (need JWT)

//get posts on a page
router.post('/',protect, createProperty)
router.get('/:page', protect, getProperties) // private/protected

module.exports = router // export the router
