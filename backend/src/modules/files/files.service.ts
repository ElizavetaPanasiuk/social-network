import { HttpException, HttpStatus, Injectable, Logger } from '@nestjs/common';
import { v4 as uuidv4 } from 'uuid';
import * as path from 'path';
import * as fs from 'fs';
import * as fsAsync from 'fs/promises';

import { StaticRoutes } from '@/lib/global-types/staticRoutes';

@Injectable()
export class FilesService {
  private logger = new Logger('FS');

  private generateFileName(originalname: string) {
    const name = uuidv4();
    const extension = originalname.split('.').pop();
    const fileName = `${name}.${extension}`;

    return fileName;
  }

  async createFile(file: Express.Multer.File, dir: StaticRoutes) {
    const fileName = this.generateFileName(file.originalname);

    try {
      const filePath = path.resolve(__dirname, '../../..', 'static', dir);

      if (!fs.existsSync(filePath)) {
        await fsAsync.mkdir(filePath, { recursive: true });
        this.logger.log(`Created dir '${dir}/${fileName}'`);
      }

      await fsAsync.writeFile(path.resolve(filePath, fileName), file.buffer);
      this.logger.log(`Successfully saved file '${dir}/${fileName}'`);

      return `${dir}/${fileName}`;
    } catch (error) {
      this.logger.error(`Failed to save file '${dir}/${fileName}'`, error);
      throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async removeFile(fileName: string) {
    try {
      const pathToFile = path.resolve(
        __dirname,
        '../../..',
        'static',
        fileName,
      );

      if (fs.existsSync(pathToFile)) {
        await fsAsync.unlink(pathToFile);
        this.logger.log(`Successfully removed file '${fileName}'`);
      } else {
        this.logger.warn(`File '${fileName}' doesn't exist`);
      }
    } catch (error) {
      this.logger.error(`Failed to remove file '${fileName}'`, error);
      throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
}
