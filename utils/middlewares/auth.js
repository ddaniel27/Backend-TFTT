require('dotenv').config()
const jwt = require('jsonwebtoken')

function authUserByToken (req, res, next) {
  const token = req.headers['x-access-token']
  if (!token) {
    return res.status(401).json({ message: 'No token provided.' })
  }

  jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
    if (err) {
      return res.status(500).json({ message: 'Failed to authenticate token.' })
    }
    req.userEmail = decoded.email
    next()
  })
}

function createTokenWithEmail (email) {
  return jwt.sign({ email }, process.env.JWT_SECRET, { expiresIn: 604800 })
}

module.exports = {
  authUserByToken,
  createTokenWithEmail
}
