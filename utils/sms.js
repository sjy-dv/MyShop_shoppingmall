const {
  TWILIO_ACCOUNT_SID,
  TWILIO_AUTH_TOKEN,
  TWILIO_PHONE_NUMBER,
} = process.env;
const client = require('twilio')(TWILIO_ACCOUNT_SID, TWILIO_AUTH_TOKEN);

module.exports = (function () {
  const S = {};

  S.SMS = async (message, hp) => {
    client.messages
      .create({
        body: message,
        from: TWILIO_PHONE_NUMBER,
        to: hp,
      })
      .then()
      .catch((err) => {
        console.log('twilio' + err);
      });
  };

  return S;
})();
