const {check} = require('express-validator')

const userCreationValidator = [
    check('email_id','email must not be empty').not().isEmpty(),
    check('userName','username must not be empty').not().isEmpty()
]

module.exports = {userCreationValidator}