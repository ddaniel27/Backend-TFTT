const express = require('express')
const bcrypt = require('bcryptjs')

module.exports = ({ admins }, { auth }) => {
  const router = express.Router()

  router.route('/')
    .post(async (req, res) => {
      try {
        const { email, password } = req.body
        const credentials = await admins.getCredentialsByEmail(email)
        if (!credentials) {
          return res.status(401).json({ error: 'Invalid credentials' })
        }

        const compared = bcrypt.compareSync(password, credentials.password)
        if (!compared) {
          return res.status(401).json({ error: 'Invalid credentials' })
        }

        const token = auth.createTokenWithEmail(email)
        res.status(200).json({ token })
      } catch (err) {
        res.status(500).json({ error: err.message })
      }
    })
}
