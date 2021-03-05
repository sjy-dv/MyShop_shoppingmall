let io = require('socket.io')();
const dotenv = require('dotenv');
dotenv.config();
const redisAdapter = require('socket.io-redis');
const { REDIS_HOST, REDIS_PORT } = process.env;
const redis = require('redis');
const redis_client = redis.createClient(REDIS_PORT, REDIS_HOST);
redis_client.on('error', function (err) {
  console.log('RedisError' + err);
});

io.adapter(redisAdapter({ host: REDIS_HOST, port: REDIS_PORT }));
let alert_socket = io.of('/');

module.exports = (function () {
  const S = {};
  S.alert_socket = alert_socket;

  S.init = async (app) => {
    alert_socket.on('connection', (socket) => {
      console.log('socket in');
    });
  };

  S.io = io;

  return S;
})();
