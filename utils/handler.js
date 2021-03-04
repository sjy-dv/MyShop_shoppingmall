const error_code = require('./error_code.json');

module.exports = (function () {
  const H = {};

  H.errorHandler = (err) => {
    let code = 1;
    if (err.code) {
      code = err.code;
    } else {
      if (err.name) {
        if (err.name.includes('TokenExpiredError')) {
          code = 2;
        } else if (err.name.includes('JsonWebTokenError')) {
          code = 5;
        } else {
          code = 1;
        }
      }
    }
    return { code, error: error_code[code] };
  };

  H.responseHandler = () => {
    return {};
  };

  return H;
})();
