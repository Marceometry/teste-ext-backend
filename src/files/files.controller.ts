import {
  Controller,
  Post,
  UseInterceptors,
  UploadedFile,
  Req,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { Request } from 'express';
import { FilesService } from './files.service';
import multerConfig from './multer-config';

@Controller('files')
export class FilesController {
  constructor(private readonly filesService: FilesService) {}

  @Post()
  @UseInterceptors(FileInterceptor('file', multerConfig))
  uploadFile(@UploadedFile() file: Express.Multer.File, @Req() req: Request) {
    return this.filesService.saveFile(file, req);
  }
}
