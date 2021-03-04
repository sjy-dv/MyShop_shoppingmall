const multer = require('multer');
const { v4: uuidv4 } = require('uuid');
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, './uploads');
  },
  filename: (req, file, cb) => {
    cb(null, `${uuidv4()}_${file.originalname}`);
  },
});

const upload = multer({ storage: storage }).fields([
  { name: 'img' },
  { name: 'img2' },
]);

module.exports = { upload };
