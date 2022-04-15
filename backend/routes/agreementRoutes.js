//property routes
const express = require('express') // get express
const router = express.Router() // set up express router
const {
  createAgreement,
  getAgreement,
  acceptAgreement,
  rejectAgreement,
  getUserAgreements
} = require('../controllers/agreementController')
const { protect } = require('../middleware/authMiddleware') // to make routes private (need JWT)

// create new property
router.post('/', protect, createAgreement)
// get property by id
router.get('/agreement/:id', protect, getAgreement)
// accept agreement
router.put('/accept/:id', protect, acceptAgreement)
// reject agreement
router.put('/reject/:id', protect, rejectAgreement)
// get user's agreements
router.get('/user', protect, getUserAgreements)

module.exports = router // export the router
