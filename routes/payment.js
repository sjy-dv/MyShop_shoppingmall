const router = require('express').Router();
const { paymentController: controller } = require('../controllers');

router.post('/geturl', controller.GetURL);
router.post('/payok', controller.Pay);
router.post('/iamport', controller.Ipay);

module.exports = router;
