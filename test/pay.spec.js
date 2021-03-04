const payment = require('../utils/payment').Payment;
const PayRequest = require('../utils/payment').PayRequest;

describe('url_test', () => {
  it('return url', (done) => {
    if (payment) done();
  });
});

describe('pay_test', () => {
  it('if return 1 is success', (done) => {
    if (PayRequest() === 1) done();
  });
});
