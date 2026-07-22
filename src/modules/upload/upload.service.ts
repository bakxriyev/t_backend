import { Injectable, BadRequestException, NotFoundException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as fs from 'fs';
import * as path from 'path';

@Injectable()
export class UploadService {
  private uploadDir: string;

  constructor(private configService: ConfigService) {
    this.uploadDir = path.resolve(this.configService.get<string>('UPLOAD_DIR', './uploads'));
    if (!fs.existsSync(this.uploadDir)) {
      fs.mkdirSync(this.uploadDir, { recursive: true });
    }
  }

  getUploadDir(): string {
    return this.uploadDir;
  }

  async uploadFile(file: Express.Multer.File): Promise<{ url: string; filename: string }> {
    if (!file) {
      throw new BadRequestException('No file provided');
    }
    const url = `/uploads/${file.filename}`;
    return { url, filename: file.filename };
  }

  async uploadFiles(files: Express.Multer.File[]): Promise<{ url: string; filename: string }[]> {
    if (!files || files.length === 0) {
      throw new BadRequestException('No files provided');
    }
    return files.map((file) => ({
      url: `/uploads/${file.filename}`,
      filename: file.filename,
    }));
  }

  async deleteFile(filename: string): Promise<{ message: string }> {
    const filePath = path.join(this.uploadDir, filename);
    if (!fs.existsSync(filePath)) {
      throw new NotFoundException('File not found');
    }
    fs.unlinkSync(filePath);
    return { message: 'File deleted successfully' };
  }
}
