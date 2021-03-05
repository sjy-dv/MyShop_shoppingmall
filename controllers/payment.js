const { handler, payment } = require('../utils');
const { errorHandler } = handler;
const db = require('../models');
const PayList = db.payment;

module.exports = (function () {
  const P = {};

  P.GetURL = async (req, res) => {
    try {
      let { amount } = req.body;
      let geturl = await payment.PayRequest(amount);
      if (geturl) return res.status(200).send(geturl);
      else throw { code: 1 };
    } catch (err) {
      return res.status(400).send(errorHandler(err, req));
    }
  };

  P.Pay = async (req, res) => {
    try {
      let { paymentId, payerId, id, p_price, p_name } = req.body;
      let execute = await payment.Payment(paymentId, payerId);
      if (execute) res.status(200).send(execute);
      else throw { code: 3 };
      const rows = await PayList.create({
        p_name: p_name,
        p_price: p_price,
        pg_name: 'paypal',
        buyer: id,
      });
      if (!rows) throw { code: 1 };
    } catch (err) {
      return res.status(400).send(errorHandler(err, req));
    }
  };

  P.Ipay = async (req, res) => {
    try {
      let { imp_uid, merchant_uid, id, p_price, p_name } = req.body;
      let execute = await payment.IamPort(imp_uid, merchant_uid);
      if (execute) res.status(200).json({ result: true });
      else throw { code: 3 };
      const rows = await PayList.create({
        p_name: p_name,
        p_price: p_price,
        pg_name: '아임포트',
        buyer: id,
      });
      if (!rows) throw { code: 1 };
    } catch (err) {
      return res.status(400).send(errorHandler(err, req));
    }
  };

  return P;
})();
