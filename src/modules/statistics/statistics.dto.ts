import { IsString, IsOptional, IsBoolean, IsNumber, MinLength } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class CreateStatisticDto {
  @ApiProperty() @IsString() @MinLength(1) label_uz: string;
  @ApiProperty() @IsString() @MinLength(1) label_ru: string;
  @ApiProperty() @IsString() @MinLength(1) label_en: string;
  @ApiProperty() @IsNumber() value: number;
  @ApiPropertyOptional() @IsOptional() @IsString() icon?: string;
  @ApiPropertyOptional() @IsOptional() @IsNumber() order?: number;
  @ApiPropertyOptional() @IsOptional() @IsBoolean() is_active?: boolean;
}

export class UpdateStatisticDto {
  @ApiPropertyOptional() @IsOptional() @IsString() label_uz?: string;
  @ApiPropertyOptional() @IsOptional() @IsString() label_ru?: string;
  @ApiPropertyOptional() @IsOptional() @IsString() label_en?: string;
  @ApiPropertyOptional() @IsOptional() @IsNumber() value?: number;
  @ApiPropertyOptional() @IsOptional() @IsString() icon?: string;
  @ApiPropertyOptional() @IsOptional() @IsNumber() order?: number;
  @ApiPropertyOptional() @IsOptional() @IsBoolean() is_active?: boolean;
}

export class StatisticQueryDto {
  @ApiPropertyOptional() @IsOptional() @IsNumber() page?: number;
  @ApiPropertyOptional() @IsOptional() @IsNumber() limit?: number;
}
