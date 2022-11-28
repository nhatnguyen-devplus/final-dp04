import path from 'path'
import cookieParser from 'cookie-parser'
import cors from 'cors'
import dotenv from 'dotenv'
import express from 'express'
import createError from 'http-errors'
import mongoose from 'mongoose'
import indexRouter from './routes/index'
import usersRouter from './routes/users'

dotenv.config()

const app = express()
app.use(cors())

app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(cookieParser())
app.use(express.static(path.join(__dirname, 'public')))

app.use('/', indexRouter)
app.use('/users', usersRouter)

// catch 404 and forward to error handler
app.use((req, res, next) => {
  next(createError(404))
})

// error handler
app.use((err, req, res, next) => {})

const start = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_CLUSTER_URL)

    app.listen(8080, () => {
      console.log('Connect database successfully.')
      console.log('Server listening on 8080.')
    })
  } catch (error) {
    console.error(error)
    process.exit(1)
  }
}

start()

module.exports = app
