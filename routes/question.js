const router = require('express').Router();
const { questionController: controller } = require('../controllers');

router.get('/adminlist', controller.AdminAskList);
router.get('/admin_alist', controller.AdminAnswerList);

router.post('/ask', controller.Ask);
router.post('/detail', controller.AskDetail);
router.post('/clientlist', controller.ClientAskList);
router.post('/adminanswer', controller.AdminAnswer);
router.post('/client_alist', controller.ClientAnswerList);
router.post('/detailansw', controller.AnswerDetail);
router.post('/answer_ok', controller.AnswerOK);
router.post('/lookanswer', controller.LookAnswer);

module.exports = router;
