import { Module } from '@nestjs/common';
import { AppGateway } from './app.gateway';
import { UserModule } from './user/user.module';
import { MessageModule } from './message/message.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from './auth/auth.module';
import { AppController } from './app.controller';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'sqlite',
      database: 'chat.db',
      entities: [__dirname + '/**/*.entity{.ts,.js}'],
      synchronize: true,
    }),
    ServeStaticModule.forRoot({     
      rootPath: join(__dirname, '..', '..', 'front-end', 'build'), 
    }),
    UserModule,
    MessageModule,
    AuthModule,
  ],
  controllers: [AppController],
  providers: [AppGateway],
})
export class AppModule {}
