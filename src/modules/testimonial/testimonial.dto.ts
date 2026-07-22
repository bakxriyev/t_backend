import { IsString, IsOptional, IsNumber, IsBoolean, IsEnum, MinLength } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class CreateTestimonialDto {
  @ApiProperty() @IsString() @MinLength(1) name_uz: string;
  @ApiProperty() @IsString() @MinLength(1) name_ru: string;
  @ApiProperty() @IsString() @MinLength(1) name_en: string;
  @ApiPropertyOptional() @IsOptional() @IsString() position_uz?: string;
  @ApiPropertyOptional() @IsOptional() @IsString() position_ru?: string;
  @ApiPropertyOptional() @IsOptional() @IsString() position_en?: string;
  @ApiPropertyOptional() @IsOptional() @IsString() content_uz?: string;
  @ApiPropertyOptional() @IsOptional() @IsString() content_ru?: string;
  @ApiPropertyOptional() @IsOptional() @IsString() content_en?: string;
  @ApiPropertyOptional() @IsOptional() @IsString() video_url?: string;
  @ApiPropertyOptional() @IsOptional() @IsString() image?: string;
  @ApiPropertyOptional({ enum: ['text', 'video'] }) @IsOptional() @IsEnum(['text', 'video'] as const) type?: 'text' | 'video';
  @ApiPropertyOptional() @IsOptional() @IsNumber() order?: number;
  @ApiPropertyOptional() @IsOptional() @IsBoolean() is_active?: boolean;
}

export class UpdateTestimonialDto {
  @ApiPropertyOptional() @IsOptional() @IsString() name_uz?: string;
  @ApiPropertyOptional() @IsOptional() @IsString() name_ru?: string;
  @ApiPropertyOptional() @IsOptional() @IsString() name_en?: string;
  @ApiPropertyOptional() @IsOptional() @IsString() position_uz?: string;
  @ApiPropertyOptional() @IsOptional() @IsString() position_ru?: string;
  @ApiPropertyOptional() @IsOptional() @IsString() position_en?: string;
  @ApiPropertyOptional() @IsOptional() @IsString() content_uz?: string;
  @ApiPropertyOptional() @IsOptional() @IsString() content_ru?: string;
  @ApiPropertyOptional() @IsOptional() @IsString() content_en?: string;
  @ApiPropertyOptional() @IsOptional() @IsString() video_url?: string;
  @ApiPropertyOptional() @IsOptional() @IsString() image?: string;
  @ApiPropertyOptional({ enum: ['text', 'video'] }) @IsOptional() @IsEnum(['text', 'video'] as const) type?: 'text' | 'video';
  @ApiPropertyOptional() @IsOptional() @IsNumber() order?: number;
  @ApiPropertyOptional() @IsOptional() @IsBoolean() is_active?: boolean;
}

export class TestimonialQueryDto {
  @ApiPropertyOptional() @IsOptional() @IsNumber() page?: number;
  @ApiPropertyOptional() @IsOptional() @IsNumber() limit?: number;
  @ApiPropertyOptional() @IsOptional() @IsString() search?: string;
  @ApiPropertyOptional({ enum: ['text', 'video'] }) @IsOptional() @IsEnum(['text', 'video'] as const) type?: 'text' | 'video';
}
