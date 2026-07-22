import { IsString, IsOptional, IsBoolean, IsNumber, IsEmail, MinLength } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class CreateQuickQuestionDto {
  @ApiProperty() @IsString() @MinLength(2) full_name: string;
  @ApiProperty() @IsString() @MinLength(7) phone: string;
  @ApiProperty() @IsString() @MinLength(5) question: string;
}

export class UpdateQuickQuestionDto {
  @ApiPropertyOptional() @IsOptional() @IsString() full_name?: string;
  @ApiPropertyOptional() @IsOptional() @IsString() phone?: string;
  @ApiPropertyOptional() @IsOptional() @IsString() question?: string;
  @ApiPropertyOptional() @IsOptional() @IsString() answer?: string;
  @ApiPropertyOptional() @IsOptional() @IsBoolean() is_answered?: boolean;
}

export class QuickQuestionQueryDto {
  @ApiPropertyOptional() @IsOptional() @IsNumber() page?: number;
  @ApiPropertyOptional() @IsOptional() @IsNumber() limit?: number;
  @ApiPropertyOptional() @IsOptional() @IsString() search?: string;
}
