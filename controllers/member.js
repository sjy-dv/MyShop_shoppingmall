const db = require('../models');
const { hash, jwt, handler, mail, regex } = require('../utils');
const { errorHandler } = handler;
const Member = db.member;

module.exports = (function () {
  const M = {};

  M.SignUp = async (req, res) => {
    try {
      let { id, password, email } = req.body;
      let hashing = hash.generateHash(password).hashpw;
      let check_email = regex.EmailCheck(email);
      if (!check_email) throw { code: 3 };
      const rows = await Member.create({
        id: id,
        password: hashing,
        email: email,
      });
      if (rows) return res.status(200).json({ result: true });
      else throw { code: 1 };
    } catch (err) {
      return res.status(400).send(errorHandler(err, req));
    }
  };

  M.IDcheck = async (req, res) => {
    try {
      let { id } = req.body;
      const rows = await Member.findOne({ id });
      if (!rows) return res.status(200).json({ result: true });
      else throw res.status(200).json({ result: false });
    } catch (err) {
      return res.status(400).send(errorHandler(err, req));
    }
  };

  M.Login = async (req, res) => {
    try {
      let { id, password } = req.body;
      const rows = await Member.findOne({ id });
      if (!rows) throw { code: 4 };
      const check_password = hash.compareHash(password, rows.password);
      let token = jwt.createToken(rows.id);
      if (check_password) return res.status(200).json({ token: token });
      else throw { code: 3 };
    } catch (err) {
      return res.status(400).send(errorHandler(err, req));
    }
  };

  M.AuthEmail = async (req, res) => {
    try {
      let { email } = req.body;
      let authcode = await mail.sendMail(email);
      if (authcode) return res.status(200).send(authcode);
      else throw { code: 1 };
    } catch (err) {
      return res.status(400).send(errorHandler(err, req));
    }
  };

  M.AuthPasswordEmail = async (req, res) => {
    try {
      let { email } = req.body;
      let authcode = await mail.sendMail(email);
      if (authcode) return res.status(200).send(authcode);
      else throw { code: 1 };
    } catch (err) {
      return res.status(400).send(errorHandler(err, req));
    }
  };

  M.ResetPassword = async (req, res) => {
    try {
      let { id, password } = req.body;
      const rows = await Member.update(
        { password: password },
        {
          where: {
            id: id,
          },
        }
      );
      if (!rows) throw { code: 3 };
      res.status(200).json({ result: true });
    } catch (err) {
      return res.status(400).send(errorHandler(err, req));
    }
  };

  return M;
})();
