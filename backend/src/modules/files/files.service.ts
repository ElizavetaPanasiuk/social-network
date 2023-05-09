import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { v4 as uuidv4 } from 'uuid';
import * as path from 'path';
import * as fs from 'fs';
import * as fsAsync from 'fs/promises';

@Injectable()
export class FilesService {
  async createFile(file: Express.Multer.File) {
    try {
      const name = uuidv4();
      const extension = file.originalname.split('.').pop();
      const fileName = `${name}.${extension}`;
      const filePath = path.resolve(__dirname, '../../..', 'static', 'images');

      if (!fs.existsSync(filePath)) {
        await fsAsync.mkdir(filePath, { recursive: true });
      }
      await fsAsync.writeFile(path.resolve(filePath, fileName), file.buffer);

      return `images/${fileName}`;
    } catch (e) {
      throw new HttpException(e.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
}
