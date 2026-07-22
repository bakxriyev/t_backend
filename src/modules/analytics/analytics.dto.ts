import { IsString, IsOptional, IsNumber } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class CreateAnalyticDto {
  @ApiProperty() @IsString() page: string;
  @ApiPropertyOptional({ default: 1 }) @IsOptional() @IsNumber() visitors?: number;
  @ApiProperty() @IsString() date: string;
}

export class AnalyticQueryDto {
  @ApiPropertyOptional() @IsOptional() @IsString() page?: string;
  @ApiPropertyOptional() @IsOptional() @IsString() startDate?: string;
  @ApiPropertyOptional() @IsOptional() @IsString() endDate?: string;
}
