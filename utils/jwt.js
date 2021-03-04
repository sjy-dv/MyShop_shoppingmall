const jwt = require('jsonwebtoken');
const { ACCESS_KEY } = process.env;
const db = require('../models');
const Admin = db.admin;
const Dao = require('../daos/dao');
const dao = new Dao();

module.exports = (function () {
  const J = {};

  J.createToken = (payload) => {
    const token = jwt.sign({ userid: payload.toString() }, ACCESS_KEY, {
      algorithm: 'HS256',
      expiresIn: '3H',
    });
    return token;
  };

  J.verifyToken = (token) => {
    let decoded = jwt.verify(token, ACCESS_KEY);
    return decoded;
  };

  J.checkToken = async (data) => {
    let check = await dao.findById(Admin, data);
    return check;
  };

  return J;
})();
