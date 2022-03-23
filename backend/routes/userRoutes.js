//user routes
const express = require('express') // get express
const router = express.Router() // set up express router
const {
  registerSeller,
  registerBuyer,
  loginSeller,
  loginBuyer,
  getMe
} = require('../controllers/userController')

const { protect } = require('../middleware/authMiddleware') // to make routes private (need JWT)
//registering a user
router.post('/seller', registerSeller) //should be public
router.post('/buyer', registerBuyer) //should be public
//login to a user
router.post('/seller/login', loginBuyer) //should be public
router.post('/buyer/login', loginSeller) //should be public
//get current user information
router.get('/me', protect, getMe) // private/protected
//delete current user
router.delete('/id', protect, deleteMe) // private/protected
//update current username
router.put('/username', protect, updateUsername) // private/protected
//update current username
router.put('/password', protect, updatePassword) // private/protected

module.exports = router // export the router
