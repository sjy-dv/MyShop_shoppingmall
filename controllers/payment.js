const { handler, regex } = require('../utils');
const { errorHandler } = handler;
const db = require('../models');
const PayList = db.payment;
const paypal = require('paypal-rest-sdk');
const axios = require('axios');
const dotenv = require('dotenv');
dotenv.config();
const {
  PAYPAL_CLIENT_ID,
  PAYPAL_SECRET,
  IPORT_RESTAPI,
  IPORT_RESTAPI_SECRET,
} = process.env;

paypal.configure({
  mode: 'sandbox',
  client_id: PAYPAL_CLIENT_ID,
  client_secret: PAYPAL_SECRET,
});

module.exports = (function () {
  const P = {};

  P.GetURL = async (req, res) => {
    try {
      let { amount } = req.body;
      //let dollor_price = regex.ToUSD(amount);
      let payReq = JSON.stringify({
        intent: 'sale',
        redirect_urls: {
          return_url: 'http://localhost:3000/pg_paypal_payment_success',
          cancel_url: 'http://localhost:3000/pg_paypal_payment_failed',
        },
        payer: {
          payment_method: 'paypal',
        },
        transactions: [
          {
            amount: {
              total: `${amount}`,
              currency: 'USD',
            },
            description: 'MyShop_구매',
          },
        ],
      });

      await paypal.payment.create(payReq, (error, payment) => {
        if (error) throw { code: 7 };
        let links = {};
        payment.links.forEach(function (linkObj) {
          links[linkObj.rel] = {
            href: linkObj.href,
            method: linkObj.method,
          };
        });
        if (links.hasOwnProperty('approval_url')) {
          let link = links['approval_url'].href;
          return res.status(200).send(link);
        } else {
          throw { code: 3 };
        }
      });
    } catch (err) {
      console.log(err);
      return res.status(400).send(errorHandler(err, req));
    }
  };

  P.Pay = async (req, res) => {
    try {
      let { paymentId, payerId, id, p_price, p_name } = req.body;

      await paypal.payment.execute(
        paymentId,
        payerId,
        async (error, payment) => {
          if (error) throw { code: 8 };
          if (payment.state === 'approved') res.status(200).send('1');
          const rows = await PayList.create({
            p_name: p_name,
            p_price: p_price,
            pg_name: 'paypal',
            buyer: id,
          });
          if (!rows) throw { code: 1 };
        }
      );
    } catch (err) {
      return res.status(400).send(errorHandler(err, req));
    }
  };

  P.Ipay = async (req, res) => {
    try {
      let { id, p_price, p_name } = req.body;
      const get_token = await axios({
        url: 'https://api.iamport.kr/users/getToken',
        method: 'post',
        headers: {
          'Content-Type': 'application/json',
        },
        data: {
          imp_key: IPORT_RESTAPI,
          imp_secret: IPORT_RESTAPI_SECRET,
        },
      });
      const rows = await PayList.create({
        p_name: p_name,
        p_price: p_price,
        pg_name: '아임포트',
        buyer: id,
      });
      if (!rows) throw { code: 1 };
      if (get_token) return res.status(200).send(get_token);
      else throw { code: 9 };
    } catch (err) {
      return res.status(400).send(errorHandler(err, req));
    }
  };

  return P;
})();
