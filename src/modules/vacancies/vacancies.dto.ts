import { IsString, IsOptional, IsEnum, IsBoolean, IsNumber, MinLength } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class CreateVacancyDto {
  @ApiProperty() @IsString() @MinLength(1) title_uz: string;
  @ApiProperty() @IsString() @MinLength(1) title_ru: string;
  @ApiProperty() @IsString() @MinLength(1) title_en: string;
  @ApiProperty() @IsString() @MinLength(1) description_uz: string;
  @ApiProperty() @IsString() @MinLength(1) description_ru: string;
  @ApiProperty() @IsString() @MinLength(1) description_en: string;
  @ApiPropertyOptional() @IsOptional() @IsString() requirements_uz?: string;
  @ApiPropertyOptional() @IsOptional() @IsString() requirements_ru?: string;
  @ApiPropertyOptional() @IsOptional() @IsString() requirements_en?: string;
  @ApiPropertyOptional() @IsOptional() @IsString() salary?: string;
  @ApiPropertyOptional({ enum: ['full_time', 'part_time', 'internship'], default: 'full_time' })
  @IsOptional() @IsEnum(['full_time', 'part_time', 'internship'])
  type?: 'full_time' | 'part_time' | 'internship';
  @ApiPropertyOptional() @IsOptional() @IsBoolean() is_active?: boolean;
}

export class UpdateVacancyDto {
  @ApiPropertyOptional() @IsOptional() @IsString() title_uz?: string;
  @ApiPropertyOptional() @IsOptional() @IsString() title_ru?: string;
  @ApiPropertyOptional() @IsOptional() @IsString() title_en?: string;
  @ApiPropertyOptional() @IsOptional() @IsString() description_uz?: string;
  @ApiPropertyOptional() @IsOptional() @IsString() description_ru?: string;
  @ApiPropertyOptional() @IsOptional() @IsString() description_en?: string;
  @ApiPropertyOptional() @IsOptional() @IsString() requirements_uz?: string;
  @ApiPropertyOptional() @IsOptional() @IsString() requirements_ru?: string;
  @ApiPropertyOptional() @IsOptional() @IsString() requirements_en?: string;
  @ApiPropertyOptional() @IsOptional() @IsString() salary?: string;
  @ApiPropertyOptional({ enum: ['full_time', 'part_time', 'internship'] })
  @IsOptional() @IsEnum(['full_time', 'part_time', 'internship']) type?: 'full_time' | 'part_time' | 'internship';
  @ApiPropertyOptional() @IsOptional() @IsBoolean() is_active?: boolean;
}

export class VacancyQueryDto {
  @ApiPropertyOptional() @IsOptional() @IsNumber() page?: number;
  @ApiPropertyOptional() @IsOptional() @IsNumber() limit?: number;
  @ApiPropertyOptional() @IsOptional() @IsString() search?: string;
}
