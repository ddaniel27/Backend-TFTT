const { createNewUser, findByEmail, findAll, updateByEmail, deleteByEmail } = require('../models/user.model')


/**
 * USA BODY PARA GUARDAR DATOS
 */

async function postNewUser(req, res){
    try {
        const newUser = req.body
        const createdUser = await createNewUser(newUser)
        res.status(201).json({msg:"user was created",user:createdUser})
    } catch (error) {
        res.status(500).json(error)
    }
}

/**
 * USA QUERY PARAMS PARA PAGINAR
 */

async function getAllUsers(req, res){
    try {
        const {page, limit} = req.query
        const users = await findAll(page, limit)
        res.status(200).json({msg:"users found",users: users})
    } catch (error) {
        res.status(500).json(error)
    }
}

/**
 * USA BODY PARA BUSCAR
 */

async function getUserByEmail(req, res){
    try {
        const {email} = req.body
        const user = await findByEmail(email)
        res.status(200).json({msg:"user found",user: user})
    } catch (error) {
        res.status(500).json(error)
    }
}

/**
 * USA BODY PARA ACTUALIZAR
 */

async function updateUser(req, res){
    try {
        const {email, updateUser} = req.body
        const user = await updateByEmail(email, updateUser)
        res.status(200).json({msg:"user updated",user: user})
    } catch (error) {
        res.status(500).json(error)
    }
}

/**
 * USA BODY PARA ELIMINAR
 */

async function deleteUser(req, res){
    try {
        const {email} = req.body
        const user = await deleteByEmail(email)
        res.status(200).json({msg:"user deleted",user: user})
    } catch (error) {
        res.status(500).json(error)
    }
}

module.exports = { postNewUser, getAllUsers, getUserByEmail, updateUser, deleteUser }