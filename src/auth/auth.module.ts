import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { PrismaService } from 'src/prisma.service';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { jwtConstants } from './jwt.constants';
import { jwtStrategy } from './jwt.strategy';



@Module({
  imports: [
    PassportModule,
    JwtModule.register({
      secret: jwtConstants.secret,
      signOptions: {
        expiresIn: '30m',
      },
    }),
  ],
  controllers: [AuthController],
  providers: [AuthService, PrismaService, jwtStrategy],
})
export class AuthModule {}
