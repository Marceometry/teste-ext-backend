import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { TypeOrmConfigModule } from './typeorm/typeorm.module';
import { PostsModule } from './posts/posts.module';

@Module({
  imports: [TypeOrmConfigModule, UsersModule, PostsModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
