import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmConfigModule } from './typeorm/typeorm.module';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { PostsModule } from './posts/posts.module';
import { FilesModule } from './files/files.module';

@Module({
  imports: [
    TypeOrmConfigModule,
    UsersModule,
    PostsModule,
    AuthModule,
    FilesModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
