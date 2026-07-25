import { IsString, IsOptional, IsEmail, IsNumber } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class UpdateSettingsDto {
  @ApiPropertyOptional() @IsOptional() @IsString() site_name_uz?: string;
  @ApiPropertyOptional() @IsOptional() @IsString() site_name_ru?: string;
  @ApiPropertyOptional() @IsOptional() @IsString() site_name_en?: string;
  @ApiPropertyOptional() @IsOptional() @IsString() logo?: string;
  @ApiPropertyOptional() @IsOptional() @IsString() favicon?: string;
  @ApiPropertyOptional() @IsOptional() @IsEmail() email?: string;
  @ApiPropertyOptional() @IsOptional() @IsString() phone?: string;
  @ApiPropertyOptional() @IsOptional() @IsString() address_uz?: string;
  @ApiPropertyOptional() @IsOptional() @IsString() address_ru?: string;
  @ApiPropertyOptional() @IsOptional() @IsString() address_en?: string;
  @ApiPropertyOptional() @IsOptional() @IsString() working_hours_uz?: string;
  @ApiPropertyOptional() @IsOptional() @IsString() working_hours_ru?: string;
  @ApiPropertyOptional() @IsOptional() @IsString() working_hours_en?: string;
  @ApiPropertyOptional() @IsOptional() @IsString() seo_title_uz?: string;
  @ApiPropertyOptional() @IsOptional() @IsString() seo_title_ru?: string;
  @ApiPropertyOptional() @IsOptional() @IsString() seo_title_en?: string;
  @ApiPropertyOptional() @IsOptional() @IsString() seo_description_uz?: string;
  @ApiPropertyOptional() @IsOptional() @IsString() seo_description_ru?: string;
  @ApiPropertyOptional() @IsOptional() @IsString() seo_description_en?: string;
  @ApiPropertyOptional() @IsOptional() @IsString() seo_keywords_uz?: string;
  @ApiPropertyOptional() @IsOptional() @IsString() seo_keywords_ru?: string;
  @ApiPropertyOptional() @IsOptional() @IsString() seo_keywords_en?: string;

  @ApiPropertyOptional() @IsOptional() @IsString() latitude?: string;
  @ApiPropertyOptional() @IsOptional() @IsString() longitude?: string;
}

export class SettingQueryDto {
  @ApiPropertyOptional() @IsOptional() @IsNumber() page?: number;
  @ApiPropertyOptional() @IsOptional() @IsNumber() limit?: number;
}
