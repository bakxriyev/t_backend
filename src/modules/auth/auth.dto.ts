import { IsEmail, IsString, MinLength, MaxLength, IsOptional } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class LoginDto {
  @ApiProperty({ example: 'admin@tashkentlaw.uz', description: 'Admin email' })
  @IsEmail()
  email: string;

  @ApiProperty({ example: 'password123', description: 'Admin password' })
  @IsString()
  @MinLength(6)
  password: string;
}

export class RegisterDto {
  @ApiProperty({ example: 'admin@tashkentlaw.uz', description: 'Admin email' })
  @IsEmail()
  email: string;

  @ApiProperty({ example: 'password123', description: 'Admin password' })
  @IsString()
  @MinLength(6)
  @MaxLength(100)
  password: string;

  @ApiProperty({ example: 'John Doe', description: 'Admin name' })
  @IsString()
  @MinLength(2)
  @MaxLength(255)
  full_name: string;

  @ApiPropertyOptional({ example: 'ADMIN', enum: ['SUPER_ADMIN', 'ADMIN'], description: 'Admin role' })
  @IsOptional()
  @IsString()
  role?: 'SUPER_ADMIN' | 'ADMIN';
}

export class ChangePasswordDto {
  @ApiProperty({ description: 'Current password' })
  @IsString()
  @MinLength(6)
  currentPassword: string;

  @ApiProperty({ description: 'New password' })
  @IsString()
  @MinLength(6)
  @MaxLength(100)
  newPassword: string;
}
