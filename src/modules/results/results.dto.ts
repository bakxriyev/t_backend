import { IsString, IsOptional, IsNumber, IsBoolean, MinLength } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class CreateResultDto {
  @ApiProperty() @IsString() @MinLength(1) student_name_uz: string;
  @ApiProperty() @IsString() @MinLength(1) student_name_ru: string;
  @ApiProperty() @IsString() @MinLength(1) student_name_en: string;
  @ApiProperty() @IsString() @MinLength(1) achievement_uz: string;
  @ApiProperty() @IsString() @MinLength(1) achievement_ru: string;
  @ApiProperty() @IsString() @MinLength(1) achievement_en: string;
  @ApiPropertyOptional() @IsOptional() @IsString() description_uz?: string;
  @ApiPropertyOptional() @IsOptional() @IsString() description_ru?: string;
  @ApiPropertyOptional() @IsOptional() @IsString() description_en?: string;
  @ApiProperty() @IsNumber() year: number;
  @ApiPropertyOptional() @IsOptional() @IsString() photo?: string;
  @ApiPropertyOptional() @IsOptional() @IsBoolean() is_active?: boolean;
}

export class UpdateResultDto {
  @ApiPropertyOptional() @IsOptional() @IsString() student_name_uz?: string;
  @ApiPropertyOptional() @IsOptional() @IsString() student_name_ru?: string;
  @ApiPropertyOptional() @IsOptional() @IsString() student_name_en?: string;
  @ApiPropertyOptional() @IsOptional() @IsString() achievement_uz?: string;
  @ApiPropertyOptional() @IsOptional() @IsString() achievement_ru?: string;
  @ApiPropertyOptional() @IsOptional() @IsString() achievement_en?: string;
  @ApiPropertyOptional() @IsOptional() @IsString() description_uz?: string;
  @ApiPropertyOptional() @IsOptional() @IsString() description_ru?: string;
  @ApiPropertyOptional() @IsOptional() @IsString() description_en?: string;
  @ApiPropertyOptional() @IsOptional() @IsNumber() year?: number;
  @ApiPropertyOptional() @IsOptional() @IsString() photo?: string;
  @ApiPropertyOptional() @IsOptional() @IsBoolean() is_active?: boolean;
}

export class ResultQueryDto {
  @ApiPropertyOptional() @IsOptional() @IsNumber() page?: number;
  @ApiPropertyOptional() @IsOptional() @IsNumber() limit?: number;
  @ApiPropertyOptional() @IsOptional() @IsString() search?: string;
}
