const router = require('express').Router();
const { productController: controller } = require('../controllers');
const { upload } = require('../utils/multer');

[/@GET/];
router.get('/admincheck', controller.AdminCheck);
router.get('/itemlist', controller.ItemList);
router.get('/backlist', controller.BackupList);
router.get('/category', controller.Category);
router.get('/mainlist', controller.MainList);
router.get('/buycommentlist', controller.BuyCommentList);
[/@POST/];
router.post('/additem', upload, controller.addItem);
router.post('/delitem', controller.delItem);
router.post('/detailitem', controller.detailItem);
router.post('/updateitem', controller.updateItem);
router.post('/backup', controller.BackupItem);
router.post('/tag', controller.Tag);
router.post('/search', controller.Search);
router.post('/setmain', controller.SetMain);
router.post('/checkitem', controller.CheckItem);
router.post('/uncheckitem', controller.UnCheckItem);
router.post('/buyproduct', controller.BuyProduct);
router.post('/completebuy', controller.CompleteBuy);
router.post('/checkbought', controller.CheckBuy);
router.post('/addcomment', controller.addComment);
router.post('/delcomment', controller.delComment);

module.exports = router;
