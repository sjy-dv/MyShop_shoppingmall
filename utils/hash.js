const bcrypt = require('bcryptjs');
const { SALT } = process.env;

module.exports = (function () {
  const H = {};

  H.generateHash = (password) => {
    const salt = bcrypt.genSaltSync(Number(SALT));
    const hashpw = bcrypt.hashSync(password, salt);
    return { hashpw };
  };

  H.compareHash = (password, dbpassword) => {
    return bcrypt.compareSync(password, dbpassword);
  };

  return H;
})();
