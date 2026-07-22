import { IsString, IsOptional, IsNumber, IsBoolean, MinLength, Min, Max } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class CreateReviewDto {
  @ApiProperty() @IsString() @MinLength(1) name_uz: string;
  @ApiProperty() @IsString() @MinLength(1) name_ru: string;
  @ApiProperty() @IsString() @MinLength(1) name_en: string;
  @ApiProperty() @IsString() @MinLength(1) position_uz: string;
  @ApiProperty() @IsString() @MinLength(1) position_ru: string;
  @ApiProperty() @IsString() @MinLength(1) position_en: string;
  @ApiProperty() @IsString() @MinLength(1) content_uz: string;
  @ApiProperty() @IsString() @MinLength(1) content_ru: string;
  @ApiProperty() @IsString() @MinLength(1) content_en: string;
  @ApiPropertyOptional() @IsOptional() @IsNumber() @Min(1) @Max(5) rating?: number;
  @ApiPropertyOptional() @IsOptional() @IsString() photo?: string;
  @ApiPropertyOptional() @IsOptional() @IsBoolean() is_active?: boolean;
}

export class UpdateReviewDto {
  @ApiPropertyOptional() @IsOptional() @IsString() name_uz?: string;
  @ApiPropertyOptional() @IsOptional() @IsString() name_ru?: string;
  @ApiPropertyOptional() @IsOptional() @IsString() name_en?: string;
  @ApiPropertyOptional() @IsOptional() @IsString() position_uz?: string;
  @ApiPropertyOptional() @IsOptional() @IsString() position_ru?: string;
  @ApiPropertyOptional() @IsOptional() @IsString() position_en?: string;
  @ApiPropertyOptional() @IsOptional() @IsString() content_uz?: string;
  @ApiPropertyOptional() @IsOptional() @IsString() content_ru?: string;
  @ApiPropertyOptional() @IsOptional() @IsString() content_en?: string;
  @ApiPropertyOptional() @IsOptional() @IsNumber() @Min(1) @Max(5) rating?: number;
  @ApiPropertyOptional() @IsOptional() @IsString() photo?: string;
  @ApiPropertyOptional() @IsOptional() @IsBoolean() is_active?: boolean;
}

export class ReviewQueryDto {
  @ApiPropertyOptional() @IsOptional() @IsNumber() page?: number;
  @ApiPropertyOptional() @IsOptional() @IsNumber() limit?: number;
  @ApiPropertyOptional() @IsOptional() @IsString() search?: string;
}
