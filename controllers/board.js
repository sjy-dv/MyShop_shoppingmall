const db = require('../models');
const Board = db.board;
const Comment = db.comment;
const { handler } = require('../utils');
const { errorHandler } = handler;
const Dao = require('../daos/dao');
const dao = new Dao();

module.exports = (function () {
  const B = {};

  B.BoardList = async (req, res) => {
    try {
      const rows = await Board.findAll({});
      if (rows) return res.status(200).send(rows);
      else throw { code: 4 };
    } catch (err) {
      return res.status(400).send(errorHandler(err, req));
    }
  };

  B.BoardWrite = async (req, res) => {
    try {
      let { title, content, writer } = req.body;
      const rows = await Board.create({
        title: title,
        content: content,
        writer: writer,
      });
      if (rows) return res.status(200).json({ result: true });
      else throw { code: 3 };
    } catch (err) {
      return res.status(400).send(errorHandler(err, req));
    }
  };

  B.BoardDetail = async (req, res) => {
    //incontent, getcontent
    try {
      let { idx } = req.body;
      const rows = await Board.findOne({ idx: idx });
      if (rows) return res.status(200).send(rows);
      else throw { code: 3 };
    } catch (err) {
      return res.status(400).send(errorHandler(err, req));
    }
  };

  B.DelBoard = async (req, res) => {
    try {
      let { idx } = req.body;
      const rows = await dao.destroyById(Board, idx);
      if (rows) return res.status(200).json({ result: true });
      else throw { code: 3 };
    } catch (err) {
      return res.status(400).send(errorHandler(err, req));
    }
  };

  B.BoardUpdate = async (req, res) => {
    try {
      let { idx, title, content } = req.body;
      const rows = await Board.update(
        { title: title, content: content },
        { where: { idx: idx } }
      );
      if (rows) return res.status(200).json({ result: true });
      else throw { code: 3 };
    } catch (err) {
      return res.status(400).send(errorHandler(err, req));
    }
  };

  B.Comment = async (req, res) => {
    try {
      let { b_idx, writer, content } = req.body;
      const rows = await Comment.create({
        content: content,
        writer: writer,
        b_idx: b_idx,
      });
      if (rows) return res.status(200).json({ result: true });
      else throw { code: 3 };
    } catch (err) {
      return res.status(400).send(errorHandler(err, req));
    }
  };

  B.CommentList = async (req, res) => {
    try {
      let { b_idx } = req.body;
      const rows = await Comment.findAll({
        where: {
          b_idx: b_idx,
        },
      });
      if (rows) return res.status(200).send(rows);
      else throw { code: 3 };
    } catch (err) {
      return res.status(400).send(errorHandler(err, req));
    }
  };

  B.DelComment = async (req, res) => {
    try {
      let { idx } = req.body;
      const rows = await dao.destroyById(Comment, idx);
      if (rows) return res.status(200).send(rows);
      else throw { code: 3 };
    } catch (err) {
      return res.status(400).send(errorHandler(err, req));
    }
  };

  return B;
})();
