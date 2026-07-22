import { IsString, IsOptional, IsNumber, IsBoolean, MinLength, MaxLength } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class CreateHeroDto {
  @ApiProperty() @IsString() @MinLength(1) title_uz: string;
  @ApiProperty() @IsString() @MinLength(1) title_ru: string;
  @ApiProperty() @IsString() @MinLength(1) title_en: string;
  @ApiPropertyOptional() @IsOptional() @IsString() subtitle_uz?: string;
  @ApiPropertyOptional() @IsOptional() @IsString() subtitle_ru?: string;
  @ApiPropertyOptional() @IsOptional() @IsString() subtitle_en?: string;
  @ApiPropertyOptional() @IsOptional() @IsString() description_uz?: string;
  @ApiPropertyOptional() @IsOptional() @IsString() description_ru?: string;
  @ApiPropertyOptional() @IsOptional() @IsString() description_en?: string;
  @ApiPropertyOptional() @IsOptional() @IsString() button_text_uz?: string;
  @ApiPropertyOptional() @IsOptional() @IsString() button_text_ru?: string;
  @ApiPropertyOptional() @IsOptional() @IsString() button_text_en?: string;
  @ApiPropertyOptional() @IsOptional() @IsString() button_link?: string;
  @ApiPropertyOptional() @IsOptional() @IsString() image?: string;
  @ApiPropertyOptional() @IsOptional() @IsString() video_url?: string;
  @ApiPropertyOptional() @IsOptional() @IsNumber() order?: number;
  @ApiPropertyOptional() @IsOptional() @IsBoolean() is_active?: boolean;
}

export class UpdateHeroDto {
  @ApiPropertyOptional() @IsOptional() @IsString() title_uz?: string;
  @ApiPropertyOptional() @IsOptional() @IsString() title_ru?: string;
  @ApiPropertyOptional() @IsOptional() @IsString() title_en?: string;
  @ApiPropertyOptional() @IsOptional() @IsString() subtitle_uz?: string;
  @ApiPropertyOptional() @IsOptional() @IsString() subtitle_ru?: string;
  @ApiPropertyOptional() @IsOptional() @IsString() subtitle_en?: string;
  @ApiPropertyOptional() @IsOptional() @IsString() description_uz?: string;
  @ApiPropertyOptional() @IsOptional() @IsString() description_ru?: string;
  @ApiPropertyOptional() @IsOptional() @IsString() description_en?: string;
  @ApiPropertyOptional() @IsOptional() @IsString() button_text_uz?: string;
  @ApiPropertyOptional() @IsOptional() @IsString() button_text_ru?: string;
  @ApiPropertyOptional() @IsOptional() @IsString() button_text_en?: string;
  @ApiPropertyOptional() @IsOptional() @IsString() button_link?: string;
  @ApiPropertyOptional() @IsOptional() @IsString() image?: string;
  @ApiPropertyOptional() @IsOptional() @IsString() video_url?: string;
  @ApiPropertyOptional() @IsOptional() @IsNumber() order?: number;
  @ApiPropertyOptional() @IsOptional() @IsBoolean() is_active?: boolean;
}

export class HeroQueryDto {
  @ApiPropertyOptional() @IsOptional() @IsNumber() page?: number;
  @ApiPropertyOptional() @IsOptional() @IsNumber() limit?: number;
  @ApiPropertyOptional() @IsOptional() @IsBoolean() is_active?: boolean;
}
