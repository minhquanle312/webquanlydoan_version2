const Project = require('../models/projectModel')
const factory = require('./handlerFactory')
// const catchAsync = require('../utils/catchAsync')

exports.getAllProjects = factory.getAll(Project)
exports.getProject = factory.getOne(Project)
exports.createProject = factory.createOne(Project)
exports.updateProject = factory.updateOne(Project)
exports.deleteProject = factory.deleteOne(Project)
