import { IsString, IsOptional, IsEnum, IsNumber, MinLength, MaxLength } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class CreateNewsDto {
  @ApiProperty({ example: 'Yangilik sarlavhasi' })
  @IsString() @MinLength(1) @MaxLength(500)
  title_uz: string;

  @ApiProperty({ example: 'Заголовок новости' })
  @IsString() @MinLength(1) @MaxLength(500)
  title_ru: string;

  @ApiProperty({ example: 'News title' })
  @IsString() @MinLength(1) @MaxLength(500)
  title_en: string;

  @ApiProperty({ example: 'Yangilik matni...' })
  @IsString()
  content_uz: string;

  @ApiProperty({ example: 'Текст новости...' })
  @IsString()
  content_ru: string;

  @ApiProperty({ example: 'News content...' })
  @IsString()
  content_en: string;

  @ApiPropertyOptional()
  @IsOptional() @IsString()
  excerpt_uz?: string;

  @ApiPropertyOptional()
  @IsOptional() @IsString()
  excerpt_ru?: string;

  @ApiPropertyOptional()
  @IsOptional() @IsString()
  excerpt_en?: string;

  @ApiPropertyOptional()
  @IsOptional() @IsString()
  slug?: string;

  @ApiPropertyOptional()
  @IsOptional() @IsString()
  image?: string;

  @ApiPropertyOptional()
  @IsOptional() @IsString()
  video_url?: string;

  @ApiPropertyOptional({ enum: ['news', 'article', 'announcement'], default: 'news' })
  @IsOptional() @IsEnum(['news', 'article', 'announcement'])
  type?: 'news' | 'article' | 'announcement';

  @ApiPropertyOptional({ enum: ['published', 'draft'], default: 'draft' })
  @IsOptional() @IsEnum(['published', 'draft'])
  status?: 'published' | 'draft';
}

export class UpdateNewsDto {
  @ApiPropertyOptional() @IsOptional() @IsString() @MaxLength(500) title_uz?: string;
  @ApiPropertyOptional() @IsOptional() @IsString() @MaxLength(500) title_ru?: string;
  @ApiPropertyOptional() @IsOptional() @IsString() @MaxLength(500) title_en?: string;
  @ApiPropertyOptional() @IsOptional() @IsString() content_uz?: string;
  @ApiPropertyOptional() @IsOptional() @IsString() content_ru?: string;
  @ApiPropertyOptional() @IsOptional() @IsString() content_en?: string;
  @ApiPropertyOptional() @IsOptional() @IsString() excerpt_uz?: string;
  @ApiPropertyOptional() @IsOptional() @IsString() excerpt_ru?: string;
  @ApiPropertyOptional() @IsOptional() @IsString() excerpt_en?: string;
  @ApiPropertyOptional() @IsOptional() @IsString() slug?: string;
  @ApiPropertyOptional() @IsOptional() @IsString() image?: string;
  @ApiPropertyOptional() @IsOptional() @IsString() video_url?: string;
  @ApiPropertyOptional({ enum: ['news', 'article', 'announcement'] }) @IsOptional() @IsEnum(['news', 'article', 'announcement']) type?: 'news' | 'article' | 'announcement';
  @ApiPropertyOptional({ enum: ['published', 'draft'] }) @IsOptional() @IsEnum(['published', 'draft']) status?: 'published' | 'draft';
}

export class NewsQueryDto {
  @ApiPropertyOptional() @IsOptional() @IsNumber() page?: number;
  @ApiPropertyOptional() @IsOptional() @IsNumber() limit?: number;
  @ApiPropertyOptional() @IsOptional() @IsString() search?: string;
  @ApiPropertyOptional() @IsOptional() @IsString() type?: string;
  @ApiPropertyOptional() @IsOptional() @IsString() status?: string;
}
