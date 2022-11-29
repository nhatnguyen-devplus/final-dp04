const express = require('express')
const router = express.Router()

router.get('/', (req, res, next) => {
  res.send('This is user page')
})

export default router
