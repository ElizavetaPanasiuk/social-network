import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { HashService } from '../hash/hash.service';
import { UsersModule } from '../users/users.module';
import { HashModule } from 'src/modules/hash/hash.module';

@Module({
  imports: [
    UsersModule,
    HashModule,
    JwtModule.register({
      global: true,
      secret: `${process.env.JWT_SECRET}`,
      signOptions: { expiresIn: '24h' },
    }),
  ],
  providers: [AuthService, HashService],
  controllers: [AuthController],
  exports: [],
})
export class AuthModule {}
