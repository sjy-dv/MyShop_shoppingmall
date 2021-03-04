const cluster = require('cluster');
const isWin = process.platform === 'win32';

if (cluster.isMaster) {
  let NumCpu = require('os').cpus().length;

  if (!isWin) {
    for (var i = 0; i < NumCpu; i++) {
      cluster.fork();
      console.log(`clusters ${i} fork_ok`);
    }
  }

  cluster.on('exit', function (worker) {
    console.log(`worker ${worker.id} is died`);
    cluster.fork();
  });

  const db = require('./models');
  const hash = require('./utils/hash');
  db.sequelize
    .authenticate()
    .then(async () => {
      console.log('DB Connecting ...');
      await db.sequelize.sync({ force: false });

      const adminCheck = await db.member.findOne({ where: { id: 'admin' } });
      if (adminCheck) return;

      const id = 'admin';
      const password = hash.generateHash('111').hashpw;
      await db.member
        .create({ id: id, password: password, email: 'admin@admin.com' })
        .then(console.log('admin setting is completely'))
        .catch((err) => {
          console.log(`createError : ${err}`);
        });
    })
    .catch((err) => {
      console.log(`DBERROR : ${err}`);
    });
}

if ((!isWin && !cluster.isMaster) || (isWin && cluster.isMaster)) {
  setTimeout(function () {
    console.log(`worker : ${process.pid} is join`);
    if (cluster.isWorker) {
      console.log(`worker is running`);
    } else {
      console.log(
        'worker is not running \n if you have more than one worker, is Normal'
      );
    }
  }, 1000);

  const express = require('express');
  const app = express();
  const cors = require('cors');
  const compression = require('compression');
  const helmet = require('helmet');
  const dotenv = require('dotenv');
  dotenv.config();
  const { PORT } = process.env;
  const http_server = require('http');
  const logger = require('morgan');

  const corsOption = {
    origin: [
      'http://localhost:3000',
      'http://localhost:5000',
      'http://localhost:8081',
    ],
    credentials: true,
  };

  app.use(cors());
  app.use(cors(corsOption));
  app.use(compression());
  app.use(helmet());
  app.use(express.json());
  app.use(express.urlencoded({ extended: false }));
  app.use(logger('dev'));
  app.use('/img', express.static('./uploads'));

  const Router = require('./routes');

  app.use('/api/board', Router.BoardRouter);
  app.use('/api/member', Router.MemberRouter);
  app.use('/api/myinform', Router.MyinformRouter);
  app.use('/api/product', Router.ProductRouter);
  app.use('/api/question', Router.QuestionRouter);

  http_server.createServer(app).listen(PORT || 8081, (error) => {
    console.log(`http_error : ${error}`);
  });
}
