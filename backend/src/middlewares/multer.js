const multer = require("multer");

const storage = multer.diskStorage({
  destination: (_, file, cb) => {
    cb(null, file.originalname)
  }
});

const upload = multer({ storage: storage });

module.exports = upload;