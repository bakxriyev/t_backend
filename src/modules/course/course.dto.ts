import { IsString, IsOptional, IsNumber, IsBoolean } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class CreateCourseDto {
  @ApiProperty() @IsString() title_uz: string;
  @ApiProperty() @IsString() title_ru: string;
  @ApiProperty() @IsString() title_en: string;
  @ApiProperty() @IsString() description_uz: string;
  @ApiProperty() @IsString() description_ru: string;
  @ApiProperty() @IsString() description_en: string;
  @ApiPropertyOptional() @IsOptional() @IsNumber() price?: number;
  @ApiPropertyOptional() @IsOptional() @IsString() duration?: string;
  @ApiPropertyOptional() @IsOptional() @IsString() level?: string;
  @ApiPropertyOptional() @IsOptional() @IsString() image?: string;
  @ApiPropertyOptional() @IsOptional() @IsNumber() order?: number;
  @ApiPropertyOptional() @IsOptional() @IsBoolean() is_active?: boolean;
}

export class UpdateCourseDto {
  @ApiPropertyOptional() @IsOptional() @IsString() title_uz?: string;
  @ApiPropertyOptional() @IsOptional() @IsString() title_ru?: string;
  @ApiPropertyOptional() @IsOptional() @IsString() title_en?: string;
  @ApiPropertyOptional() @IsOptional() @IsString() description_uz?: string;
  @ApiPropertyOptional() @IsOptional() @IsString() description_ru?: string;
  @ApiPropertyOptional() @IsOptional() @IsString() description_en?: string;
  @ApiPropertyOptional() @IsOptional() @IsNumber() price?: number;
  @ApiPropertyOptional() @IsOptional() @IsString() duration?: string;
  @ApiPropertyOptional() @IsOptional() @IsString() level?: string;
  @ApiPropertyOptional() @IsOptional() @IsString() image?: string;
  @ApiPropertyOptional() @IsOptional() @IsNumber() order?: number;
  @ApiPropertyOptional() @IsOptional() @IsBoolean() is_active?: boolean;
}

export class CourseQueryDto {
  @ApiPropertyOptional() @IsOptional() @IsNumber() page?: number;
  @ApiPropertyOptional() @IsOptional() @IsNumber() limit?: number;
  @ApiPropertyOptional() @IsOptional() @IsString() search?: string;
  @ApiPropertyOptional() @IsOptional() @IsBoolean() is_active?: boolean;
}
