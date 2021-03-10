const { sequelize, QueryTypes } = require('../models');
const db = require('../models');
const Favorite = db.favorite;
const Basket = db.basket;
const Product = db.product;
const { handler } = require('../utils');
const { errorHandler } = handler;
const Dao = require('../daos/dao');
const dao = new Dao();

module.exports = (function () {
  const I = {};

  I.addFavorite = async (req, res) => {
    try {
      let { idx, id } = req.body;
      const rows = await Favorite.create({ idx: idx, id: id });
      if (rows) return res.status(200).json({ result: true });
      else throw { code: 3 };
    } catch (err) {
      return res.status(400).send(errorHandler(err, req));
    }
  };

  //will be changed sequelize
  I.FavoriteList = async (req, res) => {
    try {
      let { id } = req.body;
      const rows = await sequelize.query(
        'select * from shop_product inner join shop_favorites on shop_product.p_idx = shop_favorites.p_idx where shop_favorites.id = ?',
        {
          replacements: [id],
          type: QueryTypes.SELECT,
        }
      );
      if (rows) return res.status(200).send(rows);
      else throw { code: 3 };
    } catch (err) {
      return res.status(400).send(errorHandler(err, req));
    }
  };

  I.DelFavorite = async (req, res) => {
    try {
      let { idx } = req.body;
      const rows = await Favorite.destroy({
        where: { p_idx: idx },
      });
      if (rows) return res.status(200).json({ result: true });
      else throw { code: 3 };
    } catch (err) {
      return res.status(400).send(errorHandler(err, req));
    }
  };

  I.Basket = async (req, res) => {
    try {
      let { idx, id } = req.body;
      const rows = await Basket.create({
        p_idx: idx,
        id: id,
      });
      if (rows) return res.status(200).json({ result: true });
      else throw { code: 3 };
    } catch (err) {
      console.log(err);
      return res.status(400).send(errorHandler(err, req));
    }
  };

  I.BasketList = async (req, res) => {
    try {
      let { id } = req.body;
      const rows = await sequelize.query(
        'select * from shop_product inner join shop_basket on shop_product.p_idx = shop_basket.p_idx where shop_basket.id=?',
        {
          replacements: [id],
          type: QueryTypes.SELECT,
        }
      );
      if (rows) return res.status(200).send(rows);
      else throw { code: 4 };
    } catch (err) {
      return res.status(400).send(errorHandler(err, req));
    }
  };

  I.DelBasket = async (req, res) => {
    try {
      let { idx } = req.body;
      const rows = await Basket.destroy({
        where: {
          p_idx: idx,
        },
      });
      if (rows) return res.status(200).json({ result: true });
      else throw { code: 3 };
    } catch (err) {
      return res.status(400).send(errorHandler(err, req));
    }
  };

  return I;
})();
