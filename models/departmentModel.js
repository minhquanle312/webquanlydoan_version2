const mongoose = require('mongoose')

const departmentSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      unique: true,
      required: [true, 'Department must have name'],
    },
    code: {
      type: String,
      unique: true,
      required: [true, 'Department must have code'],
    },
    foundationDay: {
      type: Date,
      required: [true, 'Department must have foundation day'],
    },
    description: String,
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
)

departmentSchema.virtual('specialities', {
  ref: 'Speciality',
  foreignField: 'departmentId',
  localField: '_id',
})

const Department = mongoose.model('Department', departmentSchema)

module.exports = Department
