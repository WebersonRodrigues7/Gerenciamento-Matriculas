import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { JwtModule } from '@nestjs/jwt';
import { jwtConstants } from './constants';
import { APP_GUARD } from '@nestjs/core';
import { AuthGuard } from './auth.guard';
import { Collaborator } from './collaborator.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { JwtStrategy } from './jwt.strategy';

@Module({
  imports: [TypeOrmModule.forFeature([Collaborator]),
   JwtModule.register({
    global: true,
    secret: jwtConstants.secret,
    signOptions: {expiresIn: '1d'}
  })
],
  providers: [AuthService, JwtStrategy,{
    provide: APP_GUARD,
    useClass: AuthGuard,
  }
  ],
  controllers: [AuthController],
  exports: [AuthService]
})
export class AuthModule {}
