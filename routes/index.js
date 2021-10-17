const classRouter = require('./classRoutes')
const councilRouter = require('./councilRoutes')
const departmentRouter = require('./departmentRoutes')
const projectRouter = require('./projectRoutes')
const specialityRouter = require('./specialityRoutes')
const termRouter = require('./termRoutes')
const trainingTypeRouter = require('./trainingTypeRoutes')
const userRouter = require('./userRoutes')

function route(app) {
  app.use('/api/class', classRouter)
  app.use('/api/council', councilRouter)
  app.use('/api/department', departmentRouter)
  app.use('/api/project', projectRouter)
  app.use('/api/speciality', specialityRouter)
  app.use('/api/term', termRouter)
  app.use('/api/training-type', trainingTypeRouter)
  app.use('/api/user', userRouter)
}

module.exports = route
