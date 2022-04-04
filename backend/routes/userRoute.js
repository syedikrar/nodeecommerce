const express = require('express');
const {register, login, logout} = require('../controller/userController');
const router = express.Router();


router.route('/register').post(register);
router.route('/login').post(login);
router.route("/logout").get(logout);
module.exports = router  // exporting it into another file