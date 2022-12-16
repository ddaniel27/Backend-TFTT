const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

const { createNewUser, findByEmail, findAll, updateByEmail, deleteByEmail, createNewUserPassword } = require('../models/user.model')

/**
 * USA BODY PARA GUARDAR DATOS
 */

async function postNewUser (req, res) {
  try {
    const newUser = req.body
    const createdUser = await createNewUser(newUser)
    res.status(201).json({ msg: 'user was created', user: createdUser })
  } catch (error) {
    res.status(500).json(error)
  }
}

async function postNewUserPassword (req, res) {
  try {
    const newUser = req.body
    const createdUser = await createNewUserPassword(newUser)
    res.status(201).json({ msg: 'user was created', user: createdUser })
  } catch (error) {
    res.status(500).json(error)
  }
}

/**
 * USA QUERY PARAMS PARA PAGINAR
 */

async function getAllUsers (req, res) {
  try {
    const { page, limit } = req.query
    const users = await findAll(page, limit)
    res.status(200).json({ msg: 'users found', users })
  } catch (error) {
    res.status(500).json(error)
  }
}

/**
 * USA BODY PARA BUSCAR
 */

async function authUserByEmail (req, res) {
  try {
    const { email, password } = req.body
    const user = await findByEmail(email)

    if (!user) { return res.status(404).json({ msg: 'user not found' }) }

    const isValidPassword = bcrypt.compareSync(password, user.password)
    if (!isValidPassword) { return res.status(401).json({ msg: 'invalid password' }) }

    jwt.sign({ id: user._id }, process.env.SECRET_KEY, (err, token) => {
      if (err) { return res.status(500).json({ msg: 'error' }) }
      res.status(200).json({ token })
    })
  } catch (error) {
    res.status(500).json(error)
  }
}

/**
 * USA BODY PARA ACTUALIZAR
 */

async function updateUser (req, res) {
  try {
    const { email, updateUser } = req.body
    const user = await updateByEmail(email, updateUser)
    res.status(200).json({ msg: 'user updated', user })
  } catch (error) {
    res.status(500).json(error)
  }
}

/**
 * USA BODY PARA ELIMINAR
 */

async function deleteUser (req, res) {
  try {
    const { email } = req.body
    const user = await deleteByEmail(email)
    res.status(200).json({ msg: 'user deleted', user })
  } catch (error) {
    res.status(500).json(error)
  }
}

module.exports = { postNewUser, postNewUserPassword, getAllUsers, authUserByEmail, updateUser, deleteUser }
