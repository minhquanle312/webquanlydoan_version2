const mongoose = require('mongoose')

const specialitySchema = new mongoose.Schema(
  {
    name: {
      type: String,
      unique: true,
      required: [true, 'Speciality must have name'],
    },
    code: {
      type: String,
      unique: true,
      required: [true, 'Speciality must have code'],
    },
    description: String,
    departmentId: {
      type: mongoose.Schema.ObjectId,
      ref: 'Department',
      required: [true, 'Speciality must belong to a department'],
    },
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
)

// specialitySchema.pre(/^find/, function (next) {
//   this.populate({
//     path: 'departmentId',
//     select: 'name',
//   })
//   next()
// })

const Speciality = mongoose.model('Speciality', specialitySchema)

module.exports = Speciality
