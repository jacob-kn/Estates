const asyncHandler = require('express-async-handler')
const Property = require('../models/propertyModel')
const Seller = require('../models/sellerModel')
const Criteria = require('../models/criteriaModel')
const valid = require('../middleware/validateID')
const util = require('util')

/**
 * @desc create a new property and criteria
 * @route GET /api/properties/
 * @access private
 */
const createProperty = asyncHandler(async (req, res) => {


  if (!req.user.id) {
    res.status(400)
    throw new Error('Please add Post Information')
  }

  if (req.files === null) { // check that there is a file attached
    res.status(400)
    throw new Error('No File Selected') // this doens't work but i can't see a reason my notnpm
  }
  const acceptedImageTypes = ['image/gif', 'image/jpeg',
    'image/png', 'image/jpg', 'image/x-icon'];
  if (req.files.HousePhotos[0] === undefined) {
    req.files.HousePhotos = [req.files.HousePhotos];
  }
  const file = [req.files.HousePhotos[0]];
  for (var i = 1; i < req.files.HousePhotos.length; i++) {
    file.push(req.files.HousePhotos[i])
  }
  const newFileNameSpaces = [Date.now() + file[0].name] // new unique name
  for (var i = 1; i < req.files.HousePhotos.length; i++) {
    newFileNameSpaces.push(Date.now() + file[i].name)
  }

  const newFileName = [newFileNameSpaces[0].replace(/\s/g, '_')]
  for (var i = 1; i < req.files.HousePhotos.length; i++) {
    newFileName.push(newFileNameSpaces[i].replace(/\s/g, '_'))
  }




  for (var i = 0; i < req.files.HousePhotos.length; i++) {
    if (!acceptedImageTypes.includes(file[i].mimetype)) { // handle file of the wrong format
      res.status(400)
      throw new Error('Incorrect File Format') // this doens't work but i can't see a reason my not
    }

    // set file to a directory with a specific name in that directory
    file[i].mv(`${__dirname}/../../frontend/public/uploads/${newFileName[i]}`, err => {
      if (err) {
        console.error(err);
        return res.status(500).send(err); // server error
      }
    });
  }








  const criteria = await Criteria.create({

    quad: req.body.Quadrant,
    bathrooms: req.body.bathrooms,
    bedrooms: req.body.bedrooms,
    type: req.body.type,
    furnished: (req.body.furnished === 'Yes'),
    price: parseInt(req.body.price)
  })

  const property = await Property.create({
    seller: req.user.id, // set user as well
    imgPaths: newFileName, //add to array
    zipCode: req.body.zipCode,
    city: req.body.city,
    street: req.body.street,
    quadrant: req.body.Quadrant,
    criteria: criteria.id
    //no tags for now
  })


  const user = await Seller.findOneAndUpdate(
    { _id: req.user.id },
    {
      $push: { listings: property._id } //add to array
    },
    {
      new: true,
      upsert: false // don't create new obeject
    }
  )

  console.log('New Post created ')
  res.status(200).json(criteria + property)

})



/**
 * @desc get all properties by page and sort order
 * @route GET /api/properties/:page
 * @param {*} req.body - Has page object
 * @access private
 */
const getProperties = asyncHandler(async (req, res) => {
  if (!req.params.page) {
    res.status(400)
    throw new Error('Page number is undefined in parameters')
  }
  if (!req.body.sort) {
    res.status(400)
    throw new Error('Sort is undefined in body')
  }
  let dateSort, criteriaSort
  if (req.body.sort === 'createdAt' || req.body.sort === '-createdAt') {
    dateSort = req.body.sort
  } else if (req.body.sort === 'price' || req.body.sort === '-price') {
    criteriaSort = req.body.sort
  }
  if (!dateSort && !criteriaSort) {
    res.status(400)
    throw new Error('Sort is not supported')
  }

  const perPage = 9
  const pagesSkipped = Math.max(1, req.params.page) - 1 // page 1 or lower will be 0

  const {
    quad,
    bathrooms,
    bedrooms,
    type,
    furnished,
    minPrice,
    maxPrice
  } = req.body

  // set up filters
  const filters = {
    quad,
    bathrooms,
    bedrooms,
    type,
    furnished
  }

  if (minPrice || maxPrice) {
    if (!minPrice) {
      filters.price = { $lte: maxPrice }
    } else if (!maxPrice) {
      filters.price = { $gte: minPrice }
    } else {
      filters.price = { $gte: minPrice, $lte: maxPrice }
    }
  }

  for (const key in filters) {
    if (filters[key] === '') {
      delete filters[key]
    }
  }

  const matchedCriteria = await Criteria.find(filters)
    .select('_id')
    // pagination
    .limit(perPage)
    .skip(perPage * pagesSkipped)
    .exec()

  const criteriaIds = matchedCriteria.map(({ _id }) => _id)

  let properties
  if (dateSort) {
    properties = await Property.find({ criteria: { $in: criteriaIds } })
      .sort(dateSort) // sort by date
      // populate reference attributes
      .populate({ path: 'seller', select: '_id email isRealtor company' })
      .populate('criteria')
      .exec()
  } else {
    properties = await Property.find({ criteria: { $in: criteriaIds } })
      // populate reference attributes
      .populate({ path: 'seller', select: '_id email isRealtor company' })
      .populate({ path: 'criteria', sort: criteriaSort }) // populate criteria and sort by date
      .exec()
  }

  if (!properties) {
    res.status(400)
    throw new Error('Error finding properties')
  }

  res.status(200).json(properties)
})

module.exports = {
  getProperties,
  createProperty
}
