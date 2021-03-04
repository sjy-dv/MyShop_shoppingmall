const { sequelize, QueryTypes } = require('../models');
const db = require('../models');
const Op = db.Op;
const Product = db.product;
const Bcomment = db.buycomment;
const Dao = require('../daos/dao');
const dao = new Dao();
const { jwt, handler } = require('../utils');
const { errorHandler } = handler;

module.exports = (function () {
  const P = {};

  P.AdminCheck = async (req, res) => {
    try {
      let token = req.get('x_auth');
      let decoded = jwt.verifyToken(token);
      if (decoded.id === 'admin') return res.status(200).send('1');
      else throw { code: 1 };
    } catch (err) {
      return res.status(400).send(errorHandler(err, req));
    }
  };

  P.addItem = async (req, res) => {
    try {
      console.log('1');
      let img = '/img/' + req.files.img[0].filename;
      let img2 = '/img/' + req.files.img2[0].filename;
      let { p_name, p_content, p_price, category } = req.body;
      console.log(req.body);
      console.log(req.files);
      const rows = await Product.create({
        p_img: img,
        p_name: p_name,
        p_content: p_content,
        p_price: p_price,
        p_img2: img2,
        deleted: 'no',
        main: 'no',
        category: category,
      });
      console.log('2');
      if (rows) return res.status(200).json({ result: true });
      else throw { code: 1 };
    } catch (err) {
      return res.status(400).send(errorHandler(err, req));
    }
  };

  P.ItemList = async (req, res) => {
    try {
      const rows = await Product.findAll({ where: { deleted: 'no' } });
      if (rows) return res.status(200).send(rows);
      else throw { code: 4 };
    } catch (err) {
      return res.status(400).send(errorHandler(err, req));
    }
  };

  P.delItem = async (req, res) => {
    try {
      let { idx } = req.body;
      const rows = await Product.update(
        { deleted: 'yes', main: 'no' },
        { where: { p_idx: idx } }
      );
      if (rows) return res.status(200).json({ result: true });
      else throw { code: 3 };
    } catch (err) {
      return res.status(400).send(errorHandler(err, req));
    }
  };

  P.detailItem = async (req, res) => {
    try {
      let { idx } = req.body;
      const rows = await Product.findOne({ where: { p_idx: idx } });
      if (rows) return res.status(200).send(rows);
      else throw { code: 3 };
    } catch (err) {
      return res.status(400).send(errorHandler(err, req));
    }
  };

  P.updateItem = async (req, res) => {
    try {
      let { p_idx, p_name, p_content, p_price, category } = req.body;
      const rows = await Product.update(
        {
          p_name: p_name,
          p_content: p_content,
          p_price: p_price,
          category: category,
        },
        {
          where: {
            p_idx: p_idx,
          },
        }
      );
      if (rows) return res.status(200).json({ result: true });
      else throw { code: 3 };
    } catch (err) {
      return res.status(400).send(errorHandler(err, req));
    }
  };

  P.BackupList = async (req, res) => {
    try {
      const rows = await Product.findAll({ where: { deleted: 'yes' } });
      if (rows) return res.status(200).send(rows);
      else throw { code: 4 };
    } catch (err) {
      return res.status(400).send(errorHandler(err, req));
    }
  };

  P.BackupItem = async (req, res) => {
    try {
      let { idx } = req.body;
      const rows = await Product.update(
        {
          deleted: 'no',
        },
        {
          where: {
            p_idx: idx,
          },
        }
      );
      if (rows) return res.status(200).send(rows);
      else throw { code: 3 };
    } catch (err) {
      return res.status(400).send(errorHandler(err, req));
    }
  };

  P.Category = async (req, res) => {
    try {
      const rows = await Product.findAll({ where: { deleted: 'no' } });
      if (rows) return res.status(200).send(rows);
      else throw { code: 4 };
    } catch (err) {
      return res.status(400).send(errorHandler(err, req));
    }
  };

  P.Tag = async (req, res) => {
    try {
      let { category } = req.body;
      const rows = await Product.findAll({
        where: {
          [Op.and]: [{ deleted: 'no' }, { category: category }],
        },
      });
      if (rows) return res.status(200).send(rows);
      else throw { code: 4 };
    } catch (err) {
      return res.status(400).send(errorHandler(err, req));
    }
  };

  P.Search = async (req, res) => {
    try {
      let { name } = req.body;
      const rows = await sequelize.query(
        'select * from shop_product where deleted="no" and p_name like "%"?"%"',
        {
          replacements: [name],
          type: QueryTypes.SELECT,
        }
      );
      if (rows) return res.status(200).send(rows);
      else throw { code: 4 };
    } catch (err) {
      return res.status(400).send(errorHandler(err, req));
    }
  };

  P.MainList = async (req, res) => {
    try {
      const rows = await Product.findAll({
        where: {
          [Op.and]: [{ deleted: 'no' }, { main: 'yes' }],
        },
      });
      if (rows) return res.status(200).send(rows);
      else throw { code: 4 };
    } catch (err) {
      return res.status(400).send(errorHandler(err, req));
    }
  };

  P.SetMain = async (req, res) => {
    try {
      let { idx } = req.body;
      const rows = await Product.update(
        { main: 'yes' },
        {
          where: {
            p_idx: idx,
          },
        }
      );
      if (rows) return res.status(200).json({ result: true });
      else throw { code: 3 };
    } catch (err) {
      return res.status(400).send(errorHandler(err, req));
    }
  };

  P.CheckItem = async (req, res) => {
    try {
      let { idx } = req.body;
      const rows = await Product.findAll({
        where: {
          [Op.and]: [{ main: 'yes' }, { p_idx: idx }],
        },
      });
      if (rows) return res.status(200).send(rows);
      else throw { code: 1 };
    } catch (error) {
      return res.status(400).send(errorHandler(err, req));
    }
  };

  P.UnCheckItem = async (req, res) => {
    try {
      let { idx } = req.body;
      const rows = await Product.update(
        { main: 'no' },
        {
          where: {
            p_idx: idx,
          },
        }
      );
      if (rows) return res.status(200).json({ result: true });
      else throw { code: 3 };
    } catch (err) {
      return res.status(400).send(errorHandler(err, req));
    }
  };

  P.BuyProduct = async (req, res) => {
    try {
    } catch (err) {
      return res.status(400).send(errorHandler(err, req));
    }
  };

  P.CompleteBuy = async (req, res) => {
    try {
    } catch (err) {
      return res.status(400).send(errorHandler(err, req));
    }
  };

  P.CheckBuy = async (req, res) => {
    try {
    } catch (err) {
      return res.status(400).send(errorHandler(err, req));
    }
  };

  P.BuyCommentList = async (req, res) => {
    try {
      const rows = await Bcomment.findAll();
      if (rows) return res.status(200).send(rows);
      else throw { code: 4 };
    } catch (err) {
      return res.status(400).send(errorHandler(err, req));
    }
  };

  P.addComment = async (req, res) => {
    try {
      let { p_idx, content, writer } = req.body;
      const rows = await Bcomment.create({
        content: content,
        writer: writer,
        p_idx: p_idx,
      });
      if (rows) return res.status(200).json({ result: true });
      else throw { code: 3 };
    } catch (err) {
      return res.status(400).send(errorHandler(err, req));
    }
  };

  P.delComment = async (req, res) => {
    try {
      let { idx } = req.body;
      const rows = await dao.destroyById(Bcomment, idx);
      if (rows) return res.status(200).json({ result: true });
      else throw { code: 4 };
    } catch (err) {
      return res.status(400).send(errorHandler(err, req));
    }
  };

  return P;
})();
