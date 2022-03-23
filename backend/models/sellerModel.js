const mongoose = require('mongoose')

const sellerSchema = mongoose.Schema(
  {
    //id is created automatically
    email: {
      type: String,
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
    fee: {
      amount: { type: String },
      period: {
        startDate: { type: Date },
        endDate: { type: Date }
      },
      required: false
    }
  },
  {
    timestamps: true // automatically creates time stamps for updated and created
  }
) //end sellerSchema

module.exports = mongoose.model('Seller', sellerSchema) //export sellerSchema as Seller
