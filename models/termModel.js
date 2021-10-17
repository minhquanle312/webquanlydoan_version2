const mongoose = require('mongoose')

const termSchema = new mongoose.Schema(
  {
    start: {
      type: Date,
      required: [true, 'Term must have start year'],
    },
    end: {
      type: Date,
      required: [true, 'Term must have end year'],
    },
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
)

const Term = mongoose.model('Term', termSchema)

module.exports = Term
