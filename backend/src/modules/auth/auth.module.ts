import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';

import { HashService } from '@/hash/hash.service';
import { HashModule } from '@/hash/hash.module';
import { UsersModule } from '@/users/users.module';

import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';

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
