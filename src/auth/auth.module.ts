/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { JwtModule } from '@nestjs/jwt';
import { GoogleStrategy, JwtStrategy, RtJwtStrategy } from './strategies';
import { ConfigService } from '@nestjs/config';
import { UserService } from '../user/user.service';
import { MailModule } from '../mail/mail.module';
import { MailService } from 'src/mail/mail.service';
import { AuthUserDto } from './dto';
@Module({
  imports: [JwtModule.register({}), MailModule],
  controllers: [AuthController],
  providers: [
    AuthService,
    UserService,
    JwtStrategy,
    ConfigService,
    RtJwtStrategy,
    MailService,
    AuthUserDto,
    GoogleStrategy,
  ],
})
export class AuthModule {}
