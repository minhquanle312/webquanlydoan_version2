/* eslint-disable no-console */
const mongoose = require('mongoose')
const dotenv = require('dotenv')

// test error handler
process.on('uncaughtException', (err) => {
  console.log('UNCAUGHT EXCEPTION! 💥 Shutting down...')
  console.log(err.name, err.message)
  process.exit(1)
})

dotenv.config({ path: './config.env' })
const app = require('./app')

const DB = process.env.DATABASE.replace(
  '<password>',
  process.env.DATABASE_PASSWORD
)
// const DB = process.env.DATABASE_LOCAL

mongoose
  .connect(DB, {
    useNewUrlParse: true,
    useCreateIndex: true,
    useFindAndModify: false,
  })
  .then(() => console.log('DB connection successful!'))

const port = process.env.PORT || 3000
const server = app.listen(port, () => {
  console.log(`App running on  http://127.0.0.1:${port} ...`)
})

process.on('unhandledRejection', (err) => {
  console.log('UNHANDLED REJECTION! 💥 Shutting down...')
  console.log(err.name, err.message)
  server.close(() => {
    process.exit(1)
  })
})
