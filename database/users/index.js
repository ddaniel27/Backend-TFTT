const connection = require('../connection')

function getAllUsers (page, limit) {
  return new Promise((resolve, reject) => {
    const offset = (page - 1) * limit
    const query = 'SELECT * FROM users LIMIT ? OFFSET ?'

    connection.query(query, [limit, offset], (error, results) => {
      if (error) { reject(error) }
      resolve(results)
    })
  })
}

function getUserByEmail (email) {
  return new Promise((resolve, reject) => {
    const query = 'SELECT * FROM users WHERE email = ?'

    connection.query(query, [email], (error, results) => {
      if (error) { reject(error) }
      resolve(results)
    })
  })
}

function createUser (user) {
  return new Promise((resolve, reject) => {
    const query = `
    INSERT INTO users (email, firstname, lastname, wallet, country, city, address, zipcode, country_code, phone)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `
    const values = [
      user.email,
      user.firstname,
      user.lastname,
      user.wallet,
      user.country,
      user.city,
      user.address,
      user.zipcode,
      user.countryCode,
      user.phone
    ]

    connection.query(query, values, (error) => {
      if (error) { reject(error) }
      resolve(true)
    })
  })
}

function updateUserByEmail (email, data) {
  return new Promise((resolve, reject) => {
    const query = 'UPDATE users SET ? WHERE email = ?'

    connection.query(query, [data, email], (error, results) => {
      if (error) { reject(error) }
      resolve(results)
    })
  })
}

function deleteUserByEmail (email) {
  return new Promise((resolve, reject) => {
    const query = 'DELETE FROM users WHERE email = ?'

    connection.query(query, [email], (error, results) => {
      if (error) { reject(error) }
      resolve(results)
    })
  })
}

module.exports = {
  getAllUsers,
  getUserByEmail,
  updateUserByEmail,
  createUser,
  deleteUserByEmail
}
