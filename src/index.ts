import express, { Request, Response } from 'express';
import fs from 'fs';
import multer from 'multer';
import path from 'path';
import { CustomLogger } from './custom.logger';
import { SystemHelper } from './helpers/system.helper';

const logger = new CustomLogger('Entry Point');
const systemHelper = new SystemHelper();

const app = express();
const ip = systemHelper.getIpAddress();
const port = 3000;
const url = `http://${ip}:${port}`;

// Set EJS as the templating engine
app.set('view engine', 'ejs');

// Serve static files like CSS from the "public" folder
app.use(express.static('public'));

app.use((req, res, next) => {
  logger.info(`Request of IP: ${req.ip?.replace('::ffff:', '')}`);
  next();
});

// Helper function to get the file extension
const getFileExtension: (fileName: string) => string = (
  fileName: string
): string => {
  return path.extname(fileName).slice(1); // Remove the dot from extension
};

// Define the multer storage configuration
const storage: multer.StorageEngine = multer.diskStorage({
  destination: (
    req: Request,
    file: Express.Multer.File,
    cb: (error: Error | null, destination: string) => void
  ) => {
    const fileExtension: string = getFileExtension(file.originalname);
    const folder: string = path.join('uploads', fileExtension);

    // Ensure the folder exists
    fs.mkdirSync(folder, { recursive: true });
    cb(null, folder);
  },
  filename: (
    req: Request,
    file: Express.Multer.File,
    cb: (error: Error | null, filename: string) => void
  ) => {
    cb(null, file.originalname);
  },
});

const upload: multer.Multer = multer({ storage });

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
  upload.single('file'),
  (req: Request, res: Response): void => {
    res.redirect('/');
  }
);

//>> Start Server
app.listen(port, (): void => {
  logger.succsess(`App: ${url}`);
});
