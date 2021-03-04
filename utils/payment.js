const paypal = require('paypal-rest-sdk');
const dotenv = require('dotenv');
dotenv.config();
const { PAYPAL_CLIENT_ID, PAYPAL_SECRET } = process.env;

paypal.configure({
  mode: 'live',
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
          description: 'Products purchased from MarkZenith',
        },
      ],
    });

    await paypal.payment.create(payReq, (error, payment) => {
      if (error) return console.log(error);
      let links = {};
      payment.links.forEach(function (linkObj) {
        links[linkObj.rel] = {
          href: linkObj.href,
          method: linkObj.method,
        };
      });
      if (links.hasOwnProperty('approval_url')) {
        return links['approval_url'].href;
      } else {
        return -1;
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

  return P;
})();
