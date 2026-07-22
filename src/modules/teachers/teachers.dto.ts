import { IsString, IsOptional, IsEnum, IsNumber, IsBoolean, IsEmail, MinLength, MaxLength } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class CreateTeacherDto {
  @ApiProperty() @IsString() @MinLength(1) first_name_uz: string;
  @ApiProperty() @IsString() @MinLength(1) first_name_ru: string;
  @ApiProperty() @IsString() @MinLength(1) first_name_en: string;
  @ApiProperty() @IsString() @MinLength(1) last_name_uz: string;
  @ApiProperty() @IsString() @MinLength(1) last_name_ru: string;
  @ApiProperty() @IsString() @MinLength(1) last_name_en: string;
  @ApiPropertyOptional() @IsOptional() @IsString() patronymic_uz?: string;
  @ApiPropertyOptional() @IsOptional() @IsString() patronymic_ru?: string;
  @ApiPropertyOptional() @IsOptional() @IsString() patronymic_en?: string;
  @ApiProperty() @IsString() @MinLength(1) position_uz: string;
  @ApiProperty() @IsString() @MinLength(1) position_ru: string;
  @ApiProperty() @IsString() @MinLength(1) position_en: string;
  @ApiPropertyOptional() @IsOptional() @IsString() bio_uz?: string;
  @ApiPropertyOptional() @IsOptional() @IsString() bio_ru?: string;
  @ApiPropertyOptional() @IsOptional() @IsString() bio_en?: string;
  @ApiPropertyOptional() @IsOptional() @IsString() degree_uz?: string;
  @ApiPropertyOptional() @IsOptional() @IsString() degree_ru?: string;
  @ApiPropertyOptional() @IsOptional() @IsString() degree_en?: string;
  @ApiPropertyOptional() @IsOptional() @IsString() photo?: string;
  @ApiPropertyOptional() @IsOptional() @IsEmail() email?: string;
  @ApiPropertyOptional() @IsOptional() @IsString() phone?: string;
  @ApiPropertyOptional() @IsOptional() @IsNumber() order?: number;
  @ApiPropertyOptional() @IsOptional() @IsBoolean() is_active?: boolean;
}

export class UpdateTeacherDto {
  @ApiPropertyOptional() @IsOptional() @IsString() first_name_uz?: string;
  @ApiPropertyOptional() @IsOptional() @IsString() first_name_ru?: string;
  @ApiPropertyOptional() @IsOptional() @IsString() first_name_en?: string;
  @ApiPropertyOptional() @IsOptional() @IsString() last_name_uz?: string;
  @ApiPropertyOptional() @IsOptional() @IsString() last_name_ru?: string;
  @ApiPropertyOptional() @IsOptional() @IsString() last_name_en?: string;
  @ApiPropertyOptional() @IsOptional() @IsString() patronymic_uz?: string;
  @ApiPropertyOptional() @IsOptional() @IsString() patronymic_ru?: string;
  @ApiPropertyOptional() @IsOptional() @IsString() patronymic_en?: string;
  @ApiPropertyOptional() @IsOptional() @IsString() position_uz?: string;
  @ApiPropertyOptional() @IsOptional() @IsString() position_ru?: string;
  @ApiPropertyOptional() @IsOptional() @IsString() position_en?: string;
  @ApiPropertyOptional() @IsOptional() @IsString() bio_uz?: string;
  @ApiPropertyOptional() @IsOptional() @IsString() bio_ru?: string;
  @ApiPropertyOptional() @IsOptional() @IsString() bio_en?: string;
  @ApiPropertyOptional() @IsOptional() @IsString() degree_uz?: string;
  @ApiPropertyOptional() @IsOptional() @IsString() degree_ru?: string;
  @ApiPropertyOptional() @IsOptional() @IsString() degree_en?: string;
  @ApiPropertyOptional() @IsOptional() @IsString() photo?: string;
  @ApiPropertyOptional() @IsOptional() @IsEmail() email?: string;
  @ApiPropertyOptional() @IsOptional() @IsString() phone?: string;
  @ApiPropertyOptional() @IsOptional() @IsNumber() order?: number;
  @ApiPropertyOptional() @IsOptional() @IsBoolean() is_active?: boolean;
}

export class TeacherQueryDto {
  @ApiPropertyOptional() @IsOptional() @IsNumber() page?: number;
  @ApiPropertyOptional() @IsOptional() @IsNumber() limit?: number;
  @ApiPropertyOptional() @IsOptional() @IsString() search?: string;
  @ApiPropertyOptional() @IsOptional() @IsBoolean() is_active?: boolean;
}
