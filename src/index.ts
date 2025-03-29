import express, { Request, Response } from 'express';
import fs from 'fs';
import multer from 'multer';
import path from 'path';
import { CustomLogger } from './custom.logger';
import { SystemHelper } from './helpers/system.helper';

const logger: CustomLogger = new CustomLogger('Entry Point');

const app: express.Express = express();
const ip: string = SystemHelper.getIpAddress();
const port: number = 3101;
const url: string = `http://${ip}:${port}`;

const uploadDirectory: string = SystemHelper.uploadDirectory;
const publicDirectory: string = SystemHelper.publicDirectory;
const viewsDirectory: string = SystemHelper.viewsDirectory;

app.use('/uploads', express.static(uploadDirectory));
app.use('/public', express.static(publicDirectory));

app.set('view engine', 'ejs');
app.set('views', viewsDirectory);

/**
 * * Multer - Storage
 */
const storage: multer.StorageEngine = multer.diskStorage({
  destination: (
    req: Request,
    file: Express.Multer.File,
    cb: (error: Error | null, destination: string) => void
  ): void => {
    const fileName: string = file.originalname;
    const fileExtension: string = path.extname(fileName)?.slice(1);
    const folder: string = path.join('uploads', fileExtension);

    fs.mkdirSync(folder, { recursive: true });
    cb(null, folder);
  },
  filename: (
    req: Request,
    file: Express.Multer.File,
    cb: (error: Error | null, filename: string) => void
  ): void => {
    const fileName: string = file.originalname;
    cb(null, fileName);
  },
});

/**
 * * Multer - Uploader
 */
const uploader: multer.Multer = multer({ storage });

//>> Show Client User
app.use((req, res, next): void => {
  logger.info(`Request of IP: ${req.ip?.replace('::ffff:', '')}`);
  logger.info(JSON.stringify(req.headers, null, 2));
  next();
});

//>> Navigate - Root
app.get('/', (req: Request, res: Response): void => {
  const fileGroups: { [key: string]: Array<string> } = {};
  const uploadFolder: string = path.join(__dirname, '../uploads');
  const folders: Array<string> = fs.readdirSync(uploadFolder);

  folders.forEach((folder: string): void => {
    const folderPath: string = path.join(uploadFolder, folder);
    const files: Array<string> = fs.readdirSync(folderPath);
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
