const router = require('express').Router();
const { myinformController: controller } = require('../controllers');

router.post('/favorite', controller.addFavorite);

router.post('/favorlist', controller.FavoriteList);

router.post('/delete', controller.DelFavorite);

router.post('/basket', controller.Basket);

router.post('/basketlist', controller.BasketList);

router.post('/b_delete', controller.DelBasket);

module.exports = router;
