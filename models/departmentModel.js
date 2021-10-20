const mongoose = require('mongoose')
// const AppError = require('../utils/appError')

const Speciality = require('./specialityModel')

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

departmentSchema.post('remove', { document: true, query: false }, function () {
  // console.log(department)
  Speciality.remove({ departmentId: this._id }).exec()
})

const Department = mongoose.model('Department', departmentSchema)

module.exports = Department
