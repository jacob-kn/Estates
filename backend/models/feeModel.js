const mongoose = require('mongoose')

const feeSchema = mongoose.Schema(
  {
    //id is created automatically
    amount: {
      type: Number,
      require: [true, 'Please add an amount']
    }
  },
  {
    timestamps: true // automatically creates time stamps for updated and created
  }
) //end feeSchema

module.exports = mongoose.model('Fee', feeSchema) //export feeSchema as Fee
