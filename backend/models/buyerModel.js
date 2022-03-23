const mongoose = require('mongoose')

const buyerSchema = mongoose.Schema(
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
    savedProperties: [
      {
        // array of properties
        type: mongoose.Schema.Types.ObjectId,
        required: false,
        ref: 'Property' // reference to a model of Property
      }
    ],
    criteria: {
      type: mongoose.Schema.Types.ObjectId,
      required: false,
      ref: 'Criteria' // reference to a model of Criteria
    }
  },
  {
    timestamps: true // automatically creates time stamps for updated and created
  }
) //end buyerSchema

module.exports = mongoose.model('Buyer', buyerSchema) //export buyerSchema as Buyer
