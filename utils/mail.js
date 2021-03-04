const nodemailer = require('nodemailer');
const dotenv = require('dotenv');
dotenv.config();
const { EMAIL_ID, EMAIL_PASSWORD } = process.env;
const smtpTransport = nodemailer.createTransport({
  service: 'Gmail',
  auth: {
    user: EMAIL_ID,
    pass: EMAIL_PASSWORD,
  },
  tls: {
    rejectUnauthorized: false,
  },
});

module.exports = (function () {
  const M = {};

  M.sendMail = (email) => {
    let authcode = Math.random().toString().substr(2, 6);

    const mailOptions = {
      from: EMAIL_ID,
      to: email,
      subject: 'MyShop 인증메일 입니다.',
      text: `인증 번호 ${authcode} 를 입력해주세요.`,
    };
    smtpTransport.sendMail(mailOptions, (err, res) => {
      if (err) console.log(`mail${err}`);
      smtpTransport.close();
    });

    return authcode;
  };

  return M;
})();
