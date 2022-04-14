const mongoose = require('mongoose')

const criteriaSchema = mongoose.Schema(
  {
    //id is created automatically
    quad: {
      type: String,
      required: false
    },
    bathrooms: {
      type: String,
      required: false
    },
    bedrooms: {
      type: String,
      required: false
    },
    type: {
      type: String,
      required: false
    },
    furnished: {
      type: Boolean,
      required: false
    },
    price: {
      type: Number,
      required: false
    }
  },
  {
    collection: 'criteria', // force collection to be named criteria instead of pluralizing
    timestamps: true
  }
) //end buyerSchema

module.exports = mongoose.model('Criteria', criteriaSchema) //export criteriaSchema as Criteria
