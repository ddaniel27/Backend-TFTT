const express = require('express')
const { body } = require('express-validator')

module.exports = ({ users }, { auth, validation }) => {
  const router = express.Router()

  router.route('/')
    .get(
      auth.authUserByToken,
      async (req, res) => {
        try {
          const { page = 1, limit = 10 } = req.query
          const usersList = await users.getAllUsers(page, limit)

          res.status(200).json({ users: usersList })
        } catch (e) {
          res.status(400).json({ message: e.message })
        }
      })
    .post(
      validation.validation([
        body('email').isEmail().not().isEmpty(),
        body('firstname').isAlpha('en-US', { ignore: /[\xE0-\xFF' ']/g }).not().isEmpty(),
        body('lastname').isAlpha('en-US', { ignore: /[\xE0-\xFF' ']/g }).not().isEmpty(),
        body('wallet').isAlphanumeric().not().isEmpty(),
        body('country').optional().isAlpha('en-US', { ignore: /[\xE0-\xFF' ']/g }),
        body('city').optional().isAlpha('en-US', { ignore: /[\xE0-\xFF' ']/g }),
        body('address').optional().isAlphanumeric('en-US', { ignore: ' -' }),
        body('zipcode').optional().isAlphanumeric(),
        body('phone').optional().isInt()
      ]),
      async (req, res) => {
        try {
          await users.createUser(req.body)
          res.status(201).json({ message: 'user created' })
        } catch (e) {
          res.status(400).json({ message: e.message })
        }
      })

  return router
}
