import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import { ThrottlerModule } from '@nestjs/throttler';
import { MailerModule } from '@nestjs-modules/mailer';
import { PugAdapter } from '@nestjs-modules/mailer/dist/adapters/pug.adapter';

@Module({
  imports: [
  UserModule
  , AuthModule
  , MailerModule.forRoot({
    transport: {
      host: 'smtp.ethereal.email',
      port: 587,
      auth: {
        user: 'ron.lueilwitz@ethereal.email',
        pass: 'TRfCBgmM8svnmTQzUf'
      }
    },
    defaults: {
      from: '"wells" <ron.lueilwitz@ethereal.email>',
    },  
    template: {
      dir: __dirname + '/templates',
      adapter: new PugAdapter(),
      options: {
        strict: true,
      },
    },
  }),
],
  exports: [AppService],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
