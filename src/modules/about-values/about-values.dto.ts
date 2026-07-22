import { IsString, IsOptional, IsNumber } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class CreateAboutValueDto {
  @ApiProperty() @IsString() key: string;
  @ApiProperty() @IsString() title_uz: string;
  @ApiProperty() @IsString() title_ru: string;
  @ApiProperty() @IsString() title_en: string;
  @ApiProperty() @IsString() description_uz: string;
  @ApiProperty() @IsString() description_ru: string;
  @ApiProperty() @IsString() description_en: string;
  @ApiPropertyOptional() @IsOptional() @IsNumber() order?: number;
}

export class UpdateAboutValueDto {
  @ApiPropertyOptional() @IsOptional() @IsString() title_uz?: string;
  @ApiPropertyOptional() @IsOptional() @IsString() title_ru?: string;
  @ApiPropertyOptional() @IsOptional() @IsString() title_en?: string;
  @ApiPropertyOptional() @IsOptional() @IsString() description_uz?: string;
  @ApiPropertyOptional() @IsOptional() @IsString() description_ru?: string;
  @ApiPropertyOptional() @IsOptional() @IsString() description_en?: string;
  @ApiPropertyOptional() @IsOptional() @IsNumber() order?: number;
}
