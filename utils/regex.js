module.exports = (function () {
  const R = {};

  R.HpCheck = (hp) => {
    let format_hp = hp.replace(/\-/g, '');
    let filter = /^01([\d]{1}?)[\d]{7,8}$/.test(format_hp);
    if (filter) return true;
    return false;
  };

  R.EmailCheck = (email) => {
    let format_email = email.split('@')[0];
    let filter = /[^A-Za-z0-9]/gi.test(format_email);
    if (!filter) return true;
    return false;
  };

  R.ToUSD = (pay) => {
    let format_pay = pay.replace(/\,/g, '');
    let exchange_rate = 0.00088;
    let USD = Number(format_pay) * Number(exchange_rate);
    return USD;
  };

  return R;
})();
