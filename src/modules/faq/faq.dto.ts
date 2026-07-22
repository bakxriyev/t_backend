import { IsString, IsNumber, IsOptional } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class CreateFaqItemDto {
  @ApiProperty() @IsString() question_uz: string;
  @ApiProperty() @IsString() question_ru: string;
  @ApiProperty() @IsString() question_en: string;
  @ApiProperty() @IsString() answer_uz: string;
  @ApiProperty() @IsString() answer_ru: string;
  @ApiProperty() @IsString() answer_en: string;
  @ApiPropertyOptional() @IsOptional() @IsNumber() order?: number;
}

export class UpdateFaqItemDto {
  @ApiPropertyOptional() @IsOptional() @IsString() question_uz?: string;
  @ApiPropertyOptional() @IsOptional() @IsString() question_ru?: string;
  @ApiPropertyOptional() @IsOptional() @IsString() question_en?: string;
  @ApiPropertyOptional() @IsOptional() @IsString() answer_uz?: string;
  @ApiPropertyOptional() @IsOptional() @IsString() answer_ru?: string;
  @ApiPropertyOptional() @IsOptional() @IsString() answer_en?: string;
  @ApiPropertyOptional() @IsOptional() @IsNumber() order?: number;
}
