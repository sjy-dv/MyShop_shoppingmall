const { Sequelize, DataTypes, Op, QueryTypes } = require('sequelize');
const dotenv = require('dotenv');
dotenv.config();

const {
  MYSQL_DB,
  MYSQL_DB_USER,
  MYSQL_DB_PASSWORD,
  MYSQL_DB_HOST,
} = process.env;

const sequelize = new Sequelize(MYSQL_DB, MYSQL_DB_USER, MYSQL_DB_PASSWORD, {
  host: MYSQL_DB_HOST,
  dialect: 'mysql',
  operatorsAliases: 0,

  pool: {
    max: 5,
    min: 0,
    idle: 10000,
  },
});

let db = [];

db.member = require('./shop_member.js')(sequelize, DataTypes);
db.product = require('./shop_product.js')(sequelize, DataTypes);
db.favorite = require('./shop_favorites.js')(sequelize, DataTypes);
db.comment = require('./shop_comment.js')(sequelize, DataTypes);
db.buycomment = require('./shop_buy_comment.js')(sequelize, DataTypes);
db.board = require('./shop_board.js')(sequelize, DataTypes);
db.basket = require('./shop_basket.js')(sequelize, DataTypes);
db.ask = require('./shop_ask.js')(sequelize, DataTypes);
db.answer = require('./shop_answer.js')(sequelize, DataTypes);

db.sequelize = sequelize;
db.Op = Op;
db.QueryTypes = QueryTypes;

module.exports = db;
