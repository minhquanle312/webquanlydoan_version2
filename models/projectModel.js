const mongoose = require('mongoose')

const projectSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Project must have a name'],
    },
    url: {
      type: String,
      required: [true, 'Project must have a URL to you project'],
    },
    thumbnail: String,
    mark: {
      type: Number,
    },
    usersId: [
      {
        type: mongoose.Schema.ObjectId,
        ref: 'User',
      },
    ],
    councilId: {
      type: mongoose.Schema.ObjectId,
      ref: 'Council',
    },
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
)

projectSchema.pre(/^find/, function (next) {
  this.populate({
    path: 'usersId',
    select: 'name role',
  }).populate({
    path: 'councilId',
    select: 'name',
  })

  next()
})

const Project = mongoose.model('Project', projectSchema)

module.exports = Project
