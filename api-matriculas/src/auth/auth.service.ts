import { Injectable, UnauthorizedException } from '@nestjs/common';
import { Collaborator } from './collaborator.entity';
import { Repository } from 'typeorm';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';


@Injectable()
export class AuthService {
  constructor(@InjectRepository(Collaborator)  private collaborator: Repository<Collaborator>, private jwtService: JwtService) {}

  async signIn(email: string, pass: string): Promise<any> {
    const user = await this.collaborator.findOne({where: {email}});
    if (user?.password !== pass) {
      throw new UnauthorizedException();
    }
    const payload = { id: user.id, email: user.email };
    return {
      access_token: await this.jwtService.signAsync(payload),
    };
  }
}