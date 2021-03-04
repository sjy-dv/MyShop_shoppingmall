const router = require('express').Router();
const { boardController: controller } = require('../controllers');

router.get('/list', controller.BoardList);
router.post('/write_ok', controller.BoardWrite);
router.post('/incontent', controller.BoardDetail);
router.post('/delete', controller.DelBoard);
router.post('/getcontent', controller.BoardDetail);
router.post('/update', controller.BoardUpdate);
router.post('/comment', controller.Comment);
router.post('/commentlist', controller.CommentList);
router.post('/commentdelete', controller.DelComment);

module.exports = router;
