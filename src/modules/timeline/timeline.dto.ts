import { IsString, IsNumber, IsOptional } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class CreateTimelineItemDto {
  @ApiProperty() @IsString() year: string;
  @ApiProperty() @IsString() title_uz: string;
  @ApiProperty() @IsString() title_ru: string;
  @ApiProperty() @IsString() title_en: string;
  @ApiProperty() @IsString() description_uz: string;
  @ApiProperty() @IsString() description_ru: string;
  @ApiProperty() @IsString() description_en: string;
  @ApiPropertyOptional() @IsOptional() @IsNumber() order?: number;
}

export class UpdateTimelineItemDto {
  @ApiPropertyOptional() @IsOptional() @IsString() year?: string;
  @ApiPropertyOptional() @IsOptional() @IsString() title_uz?: string;
  @ApiPropertyOptional() @IsOptional() @IsString() title_ru?: string;
  @ApiPropertyOptional() @IsOptional() @IsString() title_en?: string;
  @ApiPropertyOptional() @IsOptional() @IsString() description_uz?: string;
  @ApiPropertyOptional() @IsOptional() @IsString() description_ru?: string;
  @ApiPropertyOptional() @IsOptional() @IsString() description_en?: string;
  @ApiPropertyOptional() @IsOptional() @IsNumber() order?: number;
}
