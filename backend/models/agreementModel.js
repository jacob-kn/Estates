const mongoose = require('mongoose')

const agreementSchema = mongoose.Schema(
  {
    //id is created automatically
    property: {
      type: mongoose.Schema.Types.ObjectId, //id field will lead to this, this type is an object id
      required: true, // this is required
      ref: 'Property' // reference to a model of User
    },
    seller: {
      type: mongoose.Schema.Types.ObjectId, //id field will lead to this, this type is an object id
      required: true, // this is required
      ref: 'Seller' // reference to a model of User
    },
    buyer: {
      type: mongoose.Schema.Types.ObjectId, //id field will lead to this, this type is an object id
      required: true, // this is required
      ref: 'Buyer' // reference to a model of User
    },
    sellerName: {
      type: String,
      required: false
    },
    buyerName: {
      type: String,
      required: true
    },
    purchasePrice: {
      type: Number,
      required: true
    },
    deposit: {
      type: Number,
      required: true
    },
    offerExpiration: {
      type: Date,
      required: true
    },
    closingDate: {
      type: Date,
      required: true
    },
    landSurveyRequested: {
      type: Boolean,
      required: true
    },
    dateSigned: {
      type: Date,
      required: false
    },
    rejected: {
      type: Date,
      required: false
    },
  },
  {
    timestamps: true // automatically creates time stamps for updated and created
  }
) //end agreementSchema

module.exports = mongoose.model('Agreement', agreementSchema) //export agreementSchema as Agreement
