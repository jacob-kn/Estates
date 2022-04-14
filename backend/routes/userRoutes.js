//user routes
const express = require('express') // get express
const router = express.Router() // set up express router
const {
  registerSeller,
  registerBuyer,
  loginSeller,
  loginBuyer,
  getMe,
  getSeller,
  deleteMe,
  updateEmail,
  updatePassword,
  updateCompany,
  addComment
} = require('../controllers/userController')
const {
  getSavedProperties,
  addToSavedProperties,
  removeFromSavedProperties,
  getListings,
  removeFromListings,
  updateListing
} = require('../controllers/userPropertiesController')

const { protect } = require('../middleware/authMiddleware') // to make routes private (need JWT)
//registering a user
router.post('/seller', registerSeller) //should be public
router.post('/buyer', registerBuyer) //should be public
//login to a user
router.post('/seller/login', loginSeller) //should be public
router.post('/buyer/login', loginBuyer) //should be public
//get current user information
router.get('/me', protect, getMe) // private/protected
//get seller information
router.get('/seller/info/:id', getSeller) // public
//delete current user
router.delete('/', protect, deleteMe) // private/protected
//update current email
router.put('/email', protect, updateEmail) // private/protected
//update current password
router.put('/password', protect, updatePassword) // private/protected
//update company name
router.put('/realtor/company', protect, updateCompany) // private/protected

// get saved properties
router.get('/buyer/saved-properties', protect, getSavedProperties) // private/protected
// add to saved properties
router.post('/buyer/saved-properties/:id', protect, addToSavedProperties) // private/protected
// remove from saved properties
router.delete('/buyer/saved-properties/:id', protect, removeFromSavedProperties) // private/protected
// get listed properties
router.get('/seller/listings', protect, getListings) // private/protected
// remove listing
router.delete('/seller/listings/:id', protect, removeFromListings) // private/protected
// update listing
router.put('/seller/listings/:id', protect, updateListing) // private/protected
// add comment to realtor
router.put('/buyer/comment/:rid', protect, addComment) // private/protected

module.exports = router // export the router
