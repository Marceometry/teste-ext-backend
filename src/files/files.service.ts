import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Request } from 'express';
import { File } from './entities/file.entity';

@Injectable()
export class FilesService {
  constructor(
    @InjectRepository(File)
    private filesRepository: Repository<File>,
  ) {}

  async saveFile(file: Express.Multer.File, req: Request) {
    const arquivo = new File();
    arquivo.fileName = file.filename;
    arquivo.contentLength = file.size;
    arquivo.contentType = file.mimetype;
    arquivo.url = `${req.protocol}://${req.get('host')}/files/${file.filename}`;

    return await this.filesRepository.save(arquivo);
  }
}
