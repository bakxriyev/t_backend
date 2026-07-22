import { IsString, IsOptional, IsNumber, IsBoolean, MinLength } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class CreateVideoReviewDto {
  @ApiProperty() @IsString() @MinLength(1) name_uz: string;
  @ApiProperty() @IsString() @MinLength(1) name_ru: string;
  @ApiProperty() @IsString() @MinLength(1) name_en: string;
  @ApiPropertyOptional() @IsOptional() @IsString() description_uz?: string;
  @ApiPropertyOptional() @IsOptional() @IsString() description_ru?: string;
  @ApiPropertyOptional() @IsOptional() @IsString() description_en?: string;
  @ApiPropertyOptional() @IsOptional() @IsString() video?: string;
  @ApiPropertyOptional() @IsOptional() @IsNumber() order?: number;
  @ApiPropertyOptional() @IsOptional() @IsBoolean() is_active?: boolean;
}

export class UpdateVideoReviewDto {
  @ApiPropertyOptional() @IsOptional() @IsString() name_uz?: string;
  @ApiPropertyOptional() @IsOptional() @IsString() name_ru?: string;
  @ApiPropertyOptional() @IsOptional() @IsString() name_en?: string;
  @ApiPropertyOptional() @IsOptional() @IsString() description_uz?: string;
  @ApiPropertyOptional() @IsOptional() @IsString() description_ru?: string;
  @ApiPropertyOptional() @IsOptional() @IsString() description_en?: string;
  @ApiPropertyOptional() @IsOptional() @IsString() video?: string;
  @ApiPropertyOptional() @IsOptional() @IsNumber() order?: number;
  @ApiPropertyOptional() @IsOptional() @IsBoolean() is_active?: boolean;
}

export class VideoReviewQueryDto {
  @ApiPropertyOptional() @IsOptional() @IsNumber() page?: number;
  @ApiPropertyOptional() @IsOptional() @IsNumber() limit?: number;
  @ApiPropertyOptional() @IsOptional() @IsString() search?: string;
}
