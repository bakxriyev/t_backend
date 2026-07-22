import { IsString, IsOptional, IsEnum, IsNumber, IsEmail, MinLength } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class CreateCourseApplicationDto {
  @ApiProperty() @IsString() @MinLength(2) full_name: string;
  @ApiProperty() @IsString() @MinLength(7) phone: string;
  @ApiPropertyOptional() @IsOptional() @IsEmail() email?: string;
  @ApiProperty() @IsString() @MinLength(2) course_name: string;
  @ApiPropertyOptional() @IsOptional() @IsString() notes?: string;
}

export class UpdateCourseApplicationDto {
  @ApiPropertyOptional() @IsOptional() @IsString() full_name?: string;
  @ApiPropertyOptional() @IsOptional() @IsString() phone?: string;
  @ApiPropertyOptional() @IsOptional() @IsEmail() email?: string;
  @ApiPropertyOptional() @IsOptional() @IsString() course_name?: string;
  @ApiPropertyOptional({ enum: ['new', 'contacted', 'registered', 'closed'] })
  @IsOptional() @IsEnum(['new', 'contacted', 'registered', 'closed']) status?: 'new' | 'contacted' | 'registered' | 'closed';
  @ApiPropertyOptional() @IsOptional() @IsString() notes?: string;
}

export class CourseApplicationQueryDto {
  @ApiPropertyOptional() @IsOptional() @IsNumber() page?: number;
  @ApiPropertyOptional() @IsOptional() @IsNumber() limit?: number;
  @ApiPropertyOptional() @IsOptional() @IsString() search?: string;
  @ApiPropertyOptional() @IsOptional() @IsString() status?: string;
}
