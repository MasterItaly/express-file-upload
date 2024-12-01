import express, { Request, Response } from 'express';
import fs from 'fs';
import multer from 'multer';
import path from 'path';
import { CustomLogger } from './custom.logger';
import { SystemHelper } from './helpers/system.helper';

const logger = new CustomLogger('Entry Point');
const systemHelper = new SystemHelper();

const app: express.Express = express();
const ip: string = systemHelper.getIpAddress();
const port: number = 3000;
const url: string = `http://${ip}:${port}`;

app.set('view engine', 'ejs');

const uploadFolder: string = systemHelper.uploadFolder;
const publicFolder: string = systemHelper.publicFolder;
logger.debug(publicFolder);

/**
 * * Get File Extension
 * @param fileName
 * @returns
 */
const getFileExtension: (fileName: string) => string = (
  fileName: string
): string => {
  return path.extname(fileName).slice(1);
};

/** * Multer - Storage */
const storage: multer.StorageEngine = multer.diskStorage({
  destination: (
    req: Request,
    file: Express.Multer.File,
    cb: (error: Error | null, destination: string) => void
  ): void => {
    const fileExtension: string = getFileExtension(file.originalname);
    const folder: string = path.join('uploads', fileExtension);

    fs.mkdirSync(folder, { recursive: true });
    cb(null, folder);
  },
  filename: (
    req: Request,
    file: Express.Multer.File,
    cb: (error: Error | null, filename: string) => void
  ): void => {
    cb(null, file.originalname);
  },
});

/** * Multer - Uploader */
const uploader: multer.Multer = multer({ storage });

app.use('/uploads', express.static(uploadFolder));
app.use('/public', express.static(publicFolder));

//>> Show Client User
app.use((req, res, next): void => {
  logger.info(`Request of IP: ${req.ip?.replace('::ffff:', '')}`);
  next();
});

//>> Navigate - Root
app.get('/', (req: Request, res: Response): void => {
  const fileGroups: { [key: string]: string[] } = {};
  const uploadFolder: string = path.join(__dirname, '../uploads');
  const folders: string[] = fs.readdirSync(uploadFolder);

  folders.forEach((folder: string): void => {
    const folderPath: string = path.join(uploadFolder, folder);
    const files: string[] = fs.readdirSync(folderPath);
    if (files.length) {
      fileGroups[folder] = files;
    }
  });

  res.render('index', { fileGroups });
});

//>> Navigate - Upload
app.post(
  '/upload',
  uploader.single('file'),
  (req: Request, res: Response): void => {
    res.redirect('/');
  }
);

//>> Start Server
app.listen(port, (): void => {
  logger.succsess(`App: ${url}`);
});
