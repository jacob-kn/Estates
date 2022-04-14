const mongoose = require('mongoose')

const sellerSchema = mongoose.Schema(
  {
    //id is created automatically
    email: {
      type: String,
      unique: true,
      required: [true, 'Please add an email']
    },
    password: {
      type: String,
      required: [true, 'Please add a password']
    },
    isRealtor: {
      type: Boolean,
      required: true
    },
    company: {
      type: String,
      required: false
    },
    listings: [
      {
        // array of properties
        type: mongoose.Schema.Types.ObjectId,
        required: false,
        ref: 'Property' // reference to a model of Property
      }
    ],
    comments: [
      {
        comment: { type: String, required: false },
        user: {
          type: mongoose.Schema.Types.ObjectId,
          required: false,
          ref: 'Buyer'
        }
      }
    ]
  },
  {
    timestamps: true // automatically creates time stamps for updated and created
  }
) //end sellerSchema

module.exports = mongoose.model('Seller', sellerSchema) //export sellerSchema as Seller
