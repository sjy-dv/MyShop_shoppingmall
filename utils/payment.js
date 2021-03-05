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

  P.PayRequest = async (price) => {
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
            total: `${price}`,
            currency: 'USD',
          },
          description: 'MyShop_구매',
        },
      ],
    });

    paypal.payment.create(payReq, (error, payment) => {
      if (error) console.log('paypal' + error);
      let links = {};
      payment.links.forEach(function (linkObj) {
        links[linkObj.rel] = {
          href: linkObj.href,
          method: linkObj.method,
        };
      });
      if (links.hasOwnProperty('approval_url')) {
        let link = links['approval_url'].href;
        return { link };
      } else {
        return '-1';
      }
    });
  };

  P.Payment = async (paymentId, payerId) => {
    await paypal.payment.execute(paymentId, payerId, (error, payment) => {
      if (error) return console.log(error);
      if (payment.state === 'approved') return 1;
      else return 0;
    });
  };

  P.IamPort = async (imp_uid, merchant_uid) => {
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
    const { access_token } = get_token.data.response;
    return access_token;
  };

  return P;
})();
