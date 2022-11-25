require('dotenv').config()
const { body, validationResult } = require('express-validator')
const jwt = require('jsonwebtoken')

// Controladores
const { postNewUser, getAllUsers, updateUser, deleteUser, authUserByEmail } = require('../controllers/user.controller')

const validate = validations => {
  return async (req, res, next) => {
    await Promise.all(validations.map(validation => validation.run(req)))
    const errors = validationResult(req)
    if (errors.isEmpty()) {
      return next()
    }
    res.status(400).json({ errors: errors.array() })
  }
}

const verifyToken = (req, res, next) => {
  try {
    const bearerHeader = req.headers.authorization.split(' ')
    if (bearerHeader.length !== 2) { return res.status(401).json({ msg: 'Invalid header value' }) }
    if (bearerHeader[0] !== 'Bearer') { return res.status(401).json({ msg: 'Invalid header value' }) }
    const token = bearerHeader[1]
    jwt.verify(token, process.env.SECRET_KEY, (err, decoded) => {
      if (err) { return res.status(401).json({ msg: 'Invalid token', error: err }) }
      req.user = decoded
      next()
    })
  } catch (err) {
    return res.status(401).json({ msg: 'Invalid token error' })
  }
}

module.exports = (router) => {
  router.route('/')
    .get((_, res) => { res.json({ msg: 'Hello' }) })
    .post((_, res) => { res.json({ msg: 'Hello' }) })

  // infoUser
  router.route('/infouser')
    .get(verifyToken, getAllUsers)
    .post(
      validate([
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
      postNewUser
    )
    .put(verifyToken, updateUser)
    .delete(verifyToken, deleteUser)

  // login
  router.route('/login')
  // .get(  (_,res)=>{ res.json({msg:"Hello"}) })
    .post(
      validate([body('email').isEmail().not().isEmpty()]),
      authUserByEmail
    )

  // register
  // router.route("/register")
  // .post(
  //   validate([
  //     body("email").isEmail().not().isEmpty(),
  //     body("firstname").isAlpha('en-US', {ignore: /[\xE0-\xFF' ']/g}).not().isEmpty(),
  //     body("lastname").isAlpha('en-US', {ignore: /[\xE0-\xFF' ']/g}).not().isEmpty(),
  //     body("wallet").isAlphanumeric().not().isEmpty(),
  //     body("country").optional().isAlpha('en-US', {ignore: /[\xE0-\xFF' ']/g}),
  //     body("city").optional().isAlpha('en-US', {ignore: /[\xE0-\xFF' ']/g}),
  //     body("address").optional().isAlphanumeric('en-US', {ignore: ' -'}),
  //     body("zipcode").optional().isAlphanumeric(),
  //     body("phone").optional().isInt()
  //   ]),
  //   postNewUserPassword
  // )
}
