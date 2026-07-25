import { IsString, IsOptional } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class CreateAboutDto {
  @ApiProperty() @IsString() content_uz: string;
  @ApiProperty() @IsString() content_ru: string;
  @ApiProperty() @IsString() content_en: string;
  @ApiPropertyOptional() @IsOptional() @IsString() mission_uz?: string;
  @ApiPropertyOptional() @IsOptional() @IsString() mission_ru?: string;
  @ApiPropertyOptional() @IsOptional() @IsString() mission_en?: string;
  @ApiPropertyOptional() @IsOptional() @IsString() vision_uz?: string;
  @ApiPropertyOptional() @IsOptional() @IsString() vision_ru?: string;
  @ApiPropertyOptional() @IsOptional() @IsString() vision_en?: string;
  @ApiPropertyOptional() @IsOptional() @IsString() image?: string;
  @ApiPropertyOptional() @IsOptional() @IsString() images?: string;
  @ApiPropertyOptional() @IsOptional() @IsString() videos?: string;
}

export class UpdateAboutDto {
  @ApiPropertyOptional() @IsOptional() @IsString() content_uz?: string;
  @ApiPropertyOptional() @IsOptional() @IsString() content_ru?: string;
  @ApiPropertyOptional() @IsOptional() @IsString() content_en?: string;
  @ApiPropertyOptional() @IsOptional() @IsString() mission_uz?: string;
  @ApiPropertyOptional() @IsOptional() @IsString() mission_ru?: string;
  @ApiPropertyOptional() @IsOptional() @IsString() mission_en?: string;
  @ApiPropertyOptional() @IsOptional() @IsString() vision_uz?: string;
  @ApiPropertyOptional() @IsOptional() @IsString() vision_ru?: string;
  @ApiPropertyOptional() @IsOptional() @IsString() vision_en?: string;
  @ApiPropertyOptional() @IsOptional() @IsString() image?: string;
  @ApiPropertyOptional() @IsOptional() @IsString() images?: string;
  @ApiPropertyOptional() @IsOptional() @IsString() videos?: string;
}
