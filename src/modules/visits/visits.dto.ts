import { IsString, IsOptional, IsNumber } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class TrackVisitDto {
  @ApiProperty({ example: '/' })
  @IsString()
  page: string;

  @ApiPropertyOptional({ example: '192.168.1.1' })
  @IsOptional() @IsString()
  ip_address?: string;

  @ApiPropertyOptional({ example: 'Mozilla/5.0 ...' })
  @IsOptional() @IsString()
  user_agent?: string;

  @ApiPropertyOptional({ example: 'Uzbekistan' })
  @IsOptional() @IsString()
  country?: string;

  @ApiPropertyOptional({ example: 'Tashkent' })
  @IsOptional() @IsString()
  region?: string;

  @ApiPropertyOptional({ example: 'Tashkent City' })
  @IsOptional() @IsString()
  city?: string;

  @ApiPropertyOptional({ example: '41.2995' })
  @IsOptional() @IsString()
  latitude?: string;

  @ApiPropertyOptional({ example: '69.2401' })
  @IsOptional() @IsString()
  longitude?: string;

  @ApiPropertyOptional({ example: 'https://google.com' })
  @IsOptional() @IsString()
  referrer?: string;
}

export class VisitStatsQueryDto {
  @ApiPropertyOptional() @IsOptional() @IsString()
  startDate?: string;

  @ApiPropertyOptional() @IsOptional() @IsString()
  endDate?: string;

  @ApiPropertyOptional() @IsOptional() @IsString()
  period?: 'day' | 'week' | 'month' | 'year';
}

export class UpdateVisitLocationDto {
  @ApiPropertyOptional({ example: 'Uzbekistan' })
  @IsOptional() @IsString()
  country?: string;

  @ApiPropertyOptional({ example: 'Tashkent' })
  @IsOptional() @IsString()
  region?: string;

  @ApiPropertyOptional({ example: 'Tashkent City' })
  @IsOptional() @IsString()
  city?: string;

  @ApiPropertyOptional({ example: '41.2995' })
  @IsOptional() @IsString()
  latitude?: string;

  @ApiPropertyOptional({ example: '69.2401' })
  @IsOptional() @IsString()
  longitude?: string;
}

export class VisitsListQueryDto {
  @ApiPropertyOptional() @IsOptional() @IsNumber()
  page?: number;

  @ApiPropertyOptional() @IsOptional() @IsNumber()
  limit?: number;
}
