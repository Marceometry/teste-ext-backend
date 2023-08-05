import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import * as path from 'path';

@Injectable()
export class FilesMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    const staticPath = path.join(__dirname, '..', '..', 'upload', 'files');
    res.sendFile(req.url, { root: staticPath }, (err) => {
      if (err) next();
    });
  }
}
