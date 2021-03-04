const router = require('express').Router();
const { memberController : controller } = require('../controllers');
 
router.post('/signup', controller.SignUp);
router.post('/login', controller.Login);
router.post('/auth', controller.AuthEmail);
router.post('/idcheck', controller.IDcheck);
router.post('/authpassword', controller.AuthPasswordEmail);
router.post('/resetpassword', controller.ResetPassword);

module.exports = router;