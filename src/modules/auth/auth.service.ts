import { Injectable, UnauthorizedException, ConflictException, BadRequestException } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { Admin } from './admin.model';
import { LoginDto, RegisterDto, ChangePasswordDto } from './auth.dto';

@Injectable()
export class AuthService {
  constructor(
    @InjectModel(Admin) private adminModel: typeof Admin,
    private jwtService: JwtService,
  ) {}

  async login(dto: LoginDto) {
    const admin = await this.adminModel.findOne({ where: { email: dto.email } });
    if (!admin) {
      throw new UnauthorizedException('Invalid email or password');
    }
    if (!admin.isActive) {
      throw new UnauthorizedException('Account is deactivated');
    }
    const isPasswordValid = await bcrypt.compare(dto.password, admin.password);
    if (!isPasswordValid) {
      throw new UnauthorizedException('Invalid email or password');
    }
    return this.generateToken(admin);
  }

  async register(dto: RegisterDto) {
    const existing = await this.adminModel.findOne({ where: { email: dto.email } });
    if (existing) {
      throw new ConflictException('Email already exists');
    }
    const hashedPassword = await bcrypt.hash(dto.password, 12);
    const admin = await this.adminModel.create({
      email: dto.email,
      password: hashedPassword,
      full_name: dto.full_name,
      role: dto.role || 'ADMIN',
      isActive: true,
    });
    return this.generateToken(admin);
  }

  async getProfile(adminId: number) {
    const admin = await this.adminModel.findByPk(adminId, {
      attributes: { exclude: ['password'] },
    });
    if (!admin) {
      throw new UnauthorizedException('Admin not found');
    }
    return admin;
  }

  async changePassword(adminId: number, dto: ChangePasswordDto) {
    const admin = await this.adminModel.findByPk(adminId);
    if (!admin) {
      throw new UnauthorizedException('Admin not found');
    }
    const isPasswordValid = await bcrypt.compare(dto.currentPassword, admin.password);
    if (!isPasswordValid) {
      throw new BadRequestException('Current password is incorrect');
    }
    admin.password = await bcrypt.hash(dto.newPassword, 12);
    await admin.save();
    return { message: 'Password changed successfully' };
  }

  private generateToken(admin: Admin) {
    const payload = { sub: admin.id, email: admin.email, role: admin.role };
    return {
      success: true,
      data: {
        token: this.jwtService.sign(payload),
        admin: {
          id: admin.id,
          full_name: admin.full_name,
          email: admin.email,
          role: admin.role,
        },
      },
    };
  }
}
