const db = require('../models');
const Ask = db.ask;
const Answer = db.answer;
const { handler } = require('../utils');
const { errorHandler } = handler;

module.exports = (function () {
  const Q = {};

  Q.Ask = async (req, res) => {
    try {
      let { id, title, content } = req.body;
      const rows = await Ask.create({
        id: id,
        title: title,
        content: content,
        answered: 'no',
      });
      if (rows) return res.status(200).json({ result: true });
      else throw { code: 3 };
    } catch (err) {
      return res.status(400).send(errorHandler(err, req));
    }
  };

  Q.AdminAskList = async (req, res) => {
    try {
      const rows = await Ask.findAll({});
      if (rows) return res.status(200).send(rows);
      else throw { code: 4 };
    } catch (err) {
      return res.status(400).send(errorHandler(err, req));
    }
  };

  Q.AskDetail = async (req, res) => {
    try {
      let { idx } = req.body;
      const rows = await Ask.findOne({
        where: {
          idx: idx,
        },
      });
      if (rows) return res.status(200).send(rows);
      else throw { code: 3 };
    } catch (err) {
      return res.status(400).send(errorHandler(err, req));
    }
  };

  Q.ClientAskList = async (req, res) => {
    try {
      let { id } = req.body;
      const rows = await Ask.findAll({
        where: {
          id: id,
        },
      });
      if (rows) return res.status(200).send(rows);
      else throw { code: 3 };
    } catch (err) {
      return res.status(400).send(errorHandler(err, req));
    }
  };

  Q.AdminAnswer = async (req, res) => {
    try {
      let { id, title, content, code } = req.body;
      const rows = await Answer.create({
        id: id,
        title: title,
        content: content,
        code: code,
        answered: 'yes',
      });
      if (rows) return res.status(200).json({ result: true });
      else throw { code: 3 };
    } catch (err) {
      console.log(err);
      return res.status(400).send(errorHandler(err, req));
    }
  };

  Q.AdminAnswerList = async (req, res) => {
    try {
      const rows = await Answer.findAll();
      if (rows) return res.status(200).send(rows);
      else throw { code: 3 };
    } catch (err) {
      return res.status(400).send(errorHandler(err, req));
    }
  };

  Q.ClientAnswerList = async (req, res) => {
    try {
      let { id } = req.body;
      const rows = await Answer.findAll({
        where: {
          id: id,
        },
      });
      if (rows) return res.status(200).send(rows);
      else throw { code: 3 };
    } catch (err) {
      return res.status(400).send(errorHandler(err, req));
    }
  };

  Q.AnswerDetail = async (req, res) => {
    try {
      let { idx } = req.body;
      const rows = await Answer.findOne({
        where: {
          idx: idx,
        },
      });
      if (rows) return res.status(200).send(rows);
      else throw { code: 3 };
    } catch (err) {
      return res.status(400).send(errorHandler(err, req));
    }
  };

  Q.AnswerOK = async (req, res) => {
    try {
      let { idx } = req.body;
      const rows = await Ask.update(
        { answered: 'yes' },
        {
          where: {
            idx: idx,
          },
        }
      );
      if (rows) return res.status(200).json({ result: true });
      else throw { code: 3 };
    } catch (err) {
      return res.status(400).send(errorHandler(err, req));
    }
  };

  Q.LookAnswer = async (req, res) => {
    try {
      let { code } = req.body;
      const rows = await Answer.findAll({
        where: {
          code: code,
        },
      });
      if (rows) return res.status(200).send(rows);
      else throw { code: 4 };
    } catch (err) {
      return res.status(400).send(errorHandler(err, req));
    }
  };

  return Q;
})();
