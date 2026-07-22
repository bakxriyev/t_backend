import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { ConfigService } from '@nestjs/config';
import { InjectModel } from '@nestjs/sequelize';
import { Admin } from './admin.model';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    private configService: ConfigService,
    @InjectModel(Admin) private adminModel: typeof Admin,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: configService.get<string>('JWT_SECRET', 'super_secret_key_2024'),
    });
  }

  async validate(payload: any) {
    const admin = await this.adminModel.findByPk(payload.sub);
    if (!admin || !admin.isActive) {
      throw new UnauthorizedException('Admin not found or inactive');
    }
    return {
      id: admin.id,
      email: admin.email,
      name: admin.full_name,
      role: admin.role,
    };
  }
}
