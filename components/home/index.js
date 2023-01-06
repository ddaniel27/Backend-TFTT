const express = require('express')

module.exports = () => {
  const router = express.Router()

  router.route('/')
    .get((_req, res) => {
      res.status(200).json({ message: 'Hello, World! - GET' })
    })
    .post((_req, res) => {
      res.status(200).json({ message: 'Hello, World! - POST' })
    })

  return router
}
