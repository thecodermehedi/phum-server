import multer, { StorageEngine } from "multer";
import path from "path";

const storage: StorageEngine = multer.diskStorage({
  destination: './temp/uploads',
  filename: function (req, file, cb) {
    const prefix = 'ums';
    const suffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
    const fileExtension = path.extname(file.originalname);
    const filename = `${prefix}-${file.fieldname}-${suffix}${fileExtension}`;
    cb(null, filename);
  },
});


export const upload = multer({ storage });
