/* eslint-disable prettier/prettier */
import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class AuthUserDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsEmail()
  email: string;
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  hashPassword: string;
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  userName: string;
  @ApiProperty()
  avatar: string;
  @ApiProperty()
  token: string;
  @ApiProperty()
  refreshToken: string;
  @ApiProperty()
  role: string;
  @ApiProperty()
  bio: string;
}
export class LoginUserDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsEmail()
  email: string;
  @ApiProperty()
  @IsNotEmpty()
  hashPassword: string;
}

export class UserGoogleDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsEmail()
  email: string;
  @ApiProperty()
  @IsNotEmpty()
  userName: string;
  @IsString()
  avatar: string;
}
