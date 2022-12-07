import path from 'path'
import cookieParser from 'cookie-parser'
import cors from 'cors'
import dotenv from 'dotenv'
import express from 'express'
import createError from 'http-errors'
import { mongoose, Error } from 'mongoose'
import Routes from './routes/index'

dotenv.config()

const app = express()
app.use(cors())

app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(cookieParser())
app.use(express.static(path.join(__dirname, 'public')))

app.use(Routes)

// catch 404 and forward to error handler
app.use((req, res, next) => {
  const error = new Error('Page Not Found')
  error.status = 404
  next(error)
})

// error handler
if (app.get('env')) {
  app.use(function (error, req, res, next) {
    res.status(error.status || 500)
    res.send({
      message: error.message,
      status: error.status,
    })
  })
}

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

export default app
