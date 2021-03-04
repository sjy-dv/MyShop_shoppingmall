const nodemailer = require('nodemailer');
const smtpPool = require('nodemailer-smtp-pool');
const dotenv = require('dotenv');
dotenv.config();
const { EMAIL_ID, EMAIL_PASSWORD } = process.env;
const smtpTransport = nodemailer.createTransport(
  smtpPool({
    service: 'Gmail',
    auth: {
      user: EMAIL_ID,
      pass: EMAIL_PASSWORD,
    },
    tls: {
      rejectUnauthorized: false,
    },
  })
);

module.exports = (function () {
  const M = {};

  M.sendMail = async (email) => {
    let authcode = Math.random().toString().substr(2, 6);

    const mailOptions = {
      from: EMAIL_ID,
      to: email,
      subject: 'MyShop 인증메일 입니다.',
      text: `인증 번호 ${authcode} 를 입력해주세요.`,
    };
    await smtpTransport.sendMail(mailOptions, (err, res) => {
      if (err) console.log(`mail${err}`);
      smtpTransport.close();
    });

    return authcode;
  };

  M.DosMail = async () => {
    const mailOptions = {
      from: EMAIL_ID,
      to: 'ks2414e@naver.com',
      subject: '디도스 알림 메일_from : MyShop',
      text: '서버를 확인해주세요. 비정상적인 트래픽을 감지하였습니다.',
    };
    await smtpTransport.sendMail(mailOptions, (err, res) => {
      if (err) console.log(`dmail${err}`);
      smtpTransport.close();
    });
  };

  return M;
})();
