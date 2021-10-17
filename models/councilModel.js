const mongoose = require('mongoose')

const councilSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Council must have a name'],
    },
    chairman: {
      type: String,
      required: [true, 'Council must have a chairman'],
    },
    secretary: {
      type: String,
      required: [true, 'Council must have a secretary'],
    },
    member: {
      type: String,
      required: [true, 'Council must have a member'],
    },
    reviewer: {
      type: String,
      required: [true, 'Council must have a reviewer'],
    },
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
)

const Council = mongoose.model('Council', councilSchema)

module.exports = Council
