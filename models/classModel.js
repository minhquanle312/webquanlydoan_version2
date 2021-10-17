const mongoose = require('mongoose')

const classSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Class must have a name'],
    },
    code: {
      type: String,
      // required: [true, 'Class must have a class code'],
      // FIXME: SET DEFAULT EQUAL TO NAME IN MIDDLEWARE
    },
    quantity: Number,
    deparmentId: {
      type: mongoose.Schema.ObjectId,
      ref: 'Department',
      required: [true, 'Class must belong to department'],
    },
    specialityId: {
      type: mongoose.Schema.ObjectId,
      ref: 'Speciality',
      required: [true, 'Class must belong to speciality'],
    },
    trainingTypeId: {
      type: mongoose.Schema.ObjectId,
      ref: 'TrainingType',
      required: [true, 'Class must belong to training type'],
    },
    termId: {
      type: mongoose.Schema.ObjectId,
      ref: 'Term',
      required: [true, 'Class must belong to training type'],
    },
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
)

classSchema.pre('save', function (next) {
  if (!this.code) this.code = this.name
  next()
})

classSchema.pre(/^find/, function (next) {
  this.populate({
    path: 'deparmentId',
    select: 'name',
  })
    .populate({
      path: 'specialityId',
      select: 'name',
    })
    .populate({
      path: 'trainingTypeId',
      select: 'name',
    })
    .populate({
      path: 'termId',
      select: 'name',
    })

  next()
})

classSchema.virtual('users', {
  ref: 'User',
  foreignField: 'classId',
  localField: '_id',
})

const Class = mongoose.model('Class', classSchema)

module.exports = Class
