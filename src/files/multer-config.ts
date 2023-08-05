import { diskStorage } from 'multer';
import { v4 as uuid } from 'uuid';
import * as path from 'path';

const multerConfig = {
  storage: diskStorage({
    destination: './upload/files',
    filename: (req, file, cb) => {
      const fileName =
        path.parse(file.originalname).name.replace(/\s/g, '') + '-' + uuid();

      const extension = path.parse(file.originalname).ext;
      cb(null, `${fileName}${extension}`);
    },
  }),
};

export default multerConfig;
