//property routes
const express = require('express') // get express
const router = express.Router() // set up express router
const {
  getFee
} = require('../controllers/feeController')
const { protect } = require('../middleware/authMiddleware') // to make routes private (need JWT)

// get fee
router.get('/', getFee)

module.exports = router // export the router
