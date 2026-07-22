import { IsString, IsOptional, IsBoolean, IsNumber, MaxLength } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class CreateSocialLinkDto {
  @ApiProperty() @IsString() @MaxLength(100) platform: string;
  @ApiProperty() @IsString() @MaxLength(500) url: string;
  @ApiPropertyOptional() @IsOptional() @IsString() icon?: string;
  @ApiPropertyOptional({ default: 0 }) @IsOptional() @IsNumber() order?: number;
  @ApiPropertyOptional({ default: true }) @IsOptional() @IsBoolean() isActive?: boolean;
}

export class UpdateSocialLinkDto {
  @ApiPropertyOptional() @IsOptional() @IsString() @MaxLength(100) platform?: string;
  @ApiPropertyOptional() @IsOptional() @IsString() @MaxLength(500) url?: string;
  @ApiPropertyOptional() @IsOptional() @IsString() icon?: string;
  @ApiPropertyOptional() @IsOptional() @IsNumber() order?: number;
  @ApiPropertyOptional() @IsOptional() @IsBoolean() isActive?: boolean;
}
