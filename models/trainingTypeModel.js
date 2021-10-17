const mongoose = require('mongoose')

const trainingTypeSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Training type must have name'],
    },
    code: {
      type: String,
      required: [true, 'Training type must have code'],
    },
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
)

const TrainingType = mongoose.model('TrainingType', trainingTypeSchema)

module.exports = TrainingType
