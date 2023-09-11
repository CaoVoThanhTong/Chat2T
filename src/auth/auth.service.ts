/* eslint-disable prettier/prettier */
import { UserService } from './../user/user.service';
import { LoginUserDto, UserGoogleDto } from './dto/auth.dto';
import { PrismaService } from './../prisma/prisma.service';
import {
  ForbiddenException,
  HttpCode,
  HttpException,
  HttpStatus,
  Injectable,
} from '@nestjs/common';
import * as bcrypt from 'bcryptjs';
import { AuthUserDto } from './dto';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { User } from '@prisma/client';
import { MailService } from '../mail/mail.service';

@Injectable()
export class AuthService {
  constructor(
    private prismaService: PrismaService,
    private jwtService: JwtService,
    public configService: ConfigService,
    private mailService: MailService,
    private authUserDto: AuthUserDto,
    private userService: UserService,
  ) {}

  async hashPassword(password: string): Promise<string> {
    const saltRound = 10;
    const salt = await bcrypt.genSalt(saltRound);
    const hash = await bcrypt.hash(password, salt);
    return hash;
  }

  async register(authUserDto: AuthUserDto) {
    const hashedPassword = await this.hashPassword(authUserDto.hashPassword);
    const verifycode = String(this.mailService.generateCode());
    try {
      const user = await this.prismaService.user.create({
        data: {
          ...authUserDto,
          hashPassword: hashedPassword,
          verifycode: verifycode,
        },
      });
      // gửi mã xác thực tới email
      await this.mailService.sendMail(user.email, user.userName, verifycode);
      console.log('gui mail thanh cong');

      const accessToken = await this.generateAccessToken(user.id, user.email);
      const refreshToken = await this.generateRefreshToken(user.id, user.email);
      await this.updateToken(user, refreshToken);
      return { accessToken, refreshToken };
    } catch (error) {
      if (error.code === 'P2002') {
        throw new ForbiddenException('exists email');
      }
    }
  }

  //ĐĂNG NHẬP
  async login(loginUserDto: LoginUserDto) {
    const user = await this.prismaService.user.findUnique({
      where: { email: loginUserDto.email },
    });
    if (!user) {
      throw new HttpException('Email is not exist', HttpStatus.UNAUTHORIZED);
    }
    const mathPassword = await bcrypt.compare(
      loginUserDto.hashPassword,
      user.hashPassword,
    );
    if (!mathPassword) {
      throw new HttpException('invalid password', HttpStatus.UNAUTHORIZED);
    }
    const isVerified = user.isVerify;
    if (!isVerified) throw new ForbiddenException('not verified');
    const accessToken = await this.generateAccessToken(user.id, user.email);
    const refreshToken = await this.generateRefreshToken(user.id, user.email);
    await this.updateToken(user, refreshToken);

    return { accessToken, refreshToken };
  }

  async refreshToken(userId: number, rfToken: string) {
    const user = await this.prismaService.user.findUnique({
      where: {
        id: userId,
      },
    });
    if (!user) {
      throw new HttpException('Email is not exist', HttpStatus.UNAUTHORIZED);
    }

    const rfMatches = rfToken === user.refreshToken;

    if (!rfMatches) {
      throw new ForbiddenException('refresh invalid');
    }
    const accessToken = await this.generateAccessToken(user.id, user.email);
    return { accessToken };
  }

  async generateAccessToken(userId: number, email: string) {
    const payload = {
      sub: userId,
      email,
    };
    return await this.jwtService.signAsync(payload, {
      expiresIn: '7d',
      secret: this.configService.get('JWT_SECRET'),
    });
  }

  async generateRefreshToken(userId: number, email: string) {
    const payload = {
      sub: userId,
      email,
    };
    return await this.jwtService.signAsync(payload, {
      expiresIn: '30d',
      secret: this.configService.get('JWT_SECRET_RF'),
    });
  }
  //thêm token vào db
  async updateToken(user: User, refreshToken: string) {
    const updateUser = await this.prismaService.user.update({
      where: {
        id: user.id,
      },
      data: { refreshToken: refreshToken },
    });
    return null;
  }

  // LOGOUT
  async logout(userId: number) {
    await this.prismaService.user.update({
      where: {
        id: userId,
      },
      data: { refreshToken: null },
    });
    return {
      msg: 'Logged out',
    };
  }

  async verifyCode(email: string, code: string) {
    const user = await this.prismaService.user.findUnique({
      where: { email: email },
    });
    if (!user) throw new ForbiddenException('not found user!!');

    const storeCode = user.verifycode;
    if (storeCode === code) {
      const user = await this.prismaService.user.update({
        where: { email: email },
        data: {
          isVerify: true,
        },
      });
      return true;
    } else {
      this.deleteUser(user);
    }
    return false;
  }

  async deleteUser(user: User) {
    await this.prismaService.user.delete({
      where: {
        id: user.id,
      },
    });
  }

  async handleVerifyToken(token: string) {
    try {
      const payload = await this.jwtService.verifyAsync(token);
      return payload['sub'];
    } catch (e) {
      throw new HttpException(
        {
          statusCode: HttpStatus.UNAUTHORIZED,
        },
        HttpStatus.UNAUTHORIZED,
      );
    }
  }

  async getUserFromAuthenticationToken(token: string) {
    const payload = this.jwtService.verify(token, {
      secret: this.configService.get('JWT_SECRET'),
    });
    if (payload.sub) {
      console.log(payload.sub);
      return this.userService.getUserById(payload.sub);
    }
  }

  async validateUser(userDto: UserGoogleDto) {
    console.log(userDto);
    const user = await this.prismaService.user.findFirst({
      where: {
        email: userDto.email,
      },
    });
    if (user) return user;
    const newUser = await this.prismaService.user.create({
      data: {
        ...userDto,
        hashPassword: '',
        isVerify: true,
      },
    });
    return newUser;
  }
}
