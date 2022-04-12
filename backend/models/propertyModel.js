const mongoose = require('mongoose')

const propertySchema = mongoose.Schema(
  {
    //id is created automatically
    seller: {
      type: mongoose.Schema.Types.ObjectId, //id field will lead to this, this type is an object id
      required: false, // this is required
      ref: 'Seller' // reference to a model of User
    },
    imgPaths: [
      {
        type: String,
        required: false // this is required
      }
    ],
    zipCode: {
      type: String,
      required: false
    },
    city: {
      type: String,
      required: false
    },
    street: {
      type: String,
      required: false
    },
    quadrant: {
      type: String,
      required: false
    },
    criteria: {
      type: mongoose.Schema.Types.ObjectId,
      required: false,
      ref: 'Criteria' // reference to a model of Criteria
    }
  },
  {
    timestamps: true // automatically creates time stamps for updated and created
  }
) //end propertySchema

module.exports = mongoose.model('Property', propertySchema) //export propertySchema as Property
