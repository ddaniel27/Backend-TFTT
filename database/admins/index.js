const connection = require('../connection')

function getCredentialsByEmail (email) {
  const query = 'SELECT * FROM admins WHERE email = ?'
  return new Promise((resolve, reject) => {
    connection.query(query, [email], (err, results) => {
      if (err) { reject(err) }
      resolve(results[0])
    })
  })
}

function createNewAdmin (email, password) {
  const query = 'INSERT INTO admins (email, password) VALUES (?, ?)'
  return new Promise((resolve, reject) => {
    connection.query(query, [email, password], (err) => {
      if (err) { reject(err) }
      resolve(true)
    })
  })
}

module.exports = {
  getCredentialsByEmail,
  createNewAdmin
}
