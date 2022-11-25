const bcrypt = require('bcryptjs')
const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    minlength: 1,
    lowercase: true
  },
  firstname: {
    type: String,
    required: true,
    trim: true,
    minlength: 1,
    lowercase: true
  },
  lastname: {
    type: String,
    required: true,
    trim: true,
    minlength: 1,
    lowercase: true
  },
  wallet: {
    type: String,
    required: true,
    trim: true,
    minlength: 1
  },
  country: {
    type: String,
    required: false,
    trim: true,
    minlength: 1,
    lowercase: true
  },
  city: {
    type: String,
    required: false,
    trim: true,
    minlength: 1,
    lowercase: true
  },
  address: {
    type: String,
    required: false,
    trim: true,
    minlength: 1,
    lowercase: true
  },
  zipcode: {
    type: String,
    required: false,
    trim: true,
    minlength: 1
  },
  phone: {
    type: String,
    required: false,
    trim: true,
    minlength: 1
  },
  password: {
    type: String,
    required: false,
    trim: true,
    minlength: 1
  },
  created_at: {
    type: String,
    default: Date(Date.now()).toString(),
    required: true
  },
  updated_at: {
    type: String,
    default: Date(Date.now()).toString(),
    required: true
  }
})

const User = mongoose.model('User', userSchema)

function createNewUser (newUser) {
  return new Promise((resolve, reject) => {
    const objectToPass = {
      ...newUser,
      password: undefined
    }
    const createdUser = new User(objectToPass)
    createdUser.save((err, data) => {
      if (err) { reject(err) } else { resolve(data) }
    })
  })
}

function createNewUserPassword (newUser) {
  return new Promise((resolve, reject) => {
    const objectToPass = {
      ...newUser,
      password: bcrypt.hashSync(newUser.password, 10)
    }
    const createdUser = new User(objectToPass)
    createdUser.save((err, data) => {
      if (err) { reject(err) } else { resolve(data) }
    })
  })
}

function findByEmail (email) {
  return new Promise((resolve, reject) => {
    User.findOne({ email }, (err, data) => {
      if (err) { reject(err) } else { resolve(data) }
    })
  })
}

function findAll (page = 1, limit = 10) {
  if (+page < 1) { page = 1 }
  if (+limit < 0) { limit = 10 }
  return new Promise((resolve, reject) => {
    User.find({})
      .skip((page - 1) * limit)
      .limit(limit)
      .select('-password')
      .exec((err, data) => {
        if (err) { reject(err) } else { resolve(data) }
      })
  })
}

function updateByEmail (email, updateUser) {
  return new Promise((resolve, reject) => {
    if (Object.keys(updateUser).length === 0) { reject('No hay datos para actualizar') }
    const objToUpdate = {
      firstname: updateUser.firstname ? updateUser.firstname : undefined,
      lastname: updateUser.lastname ? updateUser.lastname : undefined,
      wallet: updateUser.wallet ? updateUser.wallet : undefined,
      country: updateUser.country ? updateUser.country : undefined,
      city: updateUser.city ? updateUser.city : undefined,
      address: updateUser.address ? updateUser.address : undefined,
      zipcode: updateUser.zipcode ? updateUser.zipcode : undefined,
      phone: updateUser.phone ? updateUser.phone : undefined,
      updated_at: Date(Date.now()).toString()
    }
    User.findOneAndUpdate({ email }, objToUpdate, { new: true }, (err, data) => {
      if (err) { reject(err) } else { resolve(data) }
    })
  })
}

function deleteByEmail (email) {
  return new Promise((resolve, reject) => {
    User.findOneAndDelete({ email }, (err, data) => {
      if (err) { reject(err) } else { resolve(data) }
    })
  })
}

module.exports = { createNewUser, findByEmail, findAll, updateByEmail, deleteByEmail, createNewUserPassword }
