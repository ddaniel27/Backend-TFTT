const { body, validationResult } = require("express-validator")

// Controladores
const { postNewUser, getAllUsers, updateUser, deleteUser } = require("../controllers/user.controller")

const validate = validations => {
  return async (req, res, next) => {
    await Promise.all(validations.map(validation => validation.run(req)));
    const errors = validationResult(req)
    if (errors.isEmpty()) {
      return next()
    }
    res.status(400).json({ errors: errors.array() })
  }
}


module.exports = (router) => {
  router.route("/")
    .get((_,res)=>{ res.json({msg:"Hello"}) })
    .post((_,res)=>{ res.json({msg:"Hello"}) })

  //infoUser
  router.route("/infouser")
    .get(getAllUsers)
    .post(
      validate([
        body("email").isEmail().not().isEmpty(),
        body("firstname").isAlpha('en-US', {ignore: /[\xE0-\xFF' ']/g}).not().isEmpty(),
        body("lastname").isAlpha('en-US', {ignore: /[\xE0-\xFF' ']/g}).not().isEmpty(),
        body("wallet").isAlphanumeric().not().isEmpty(),
        body("country").optional().isAlpha('en-US', {ignore: /[\xE0-\xFF' ']/g}),
        body("city").optional().isAlpha('en-US', {ignore: /[\xE0-\xFF' ']/g}),
        body("address").optional().isAlphanumeric('en-US', {ignore: ' -'}),
        body("zipcode").optional().isAlphanumeric(),
        body("phone").optional().isInt()
      ]),
      postNewUser
    )
    .put(updateUser)
    .delete(deleteUser)

  //login
  router.route("/login")
  .get( (req,res)=>{ res.status(200).json({msg:"ok"}) } )
  .post( (req,res)=>{ res.status(200).json({msg:"ok"}) } )

}
