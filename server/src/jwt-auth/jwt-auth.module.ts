import { Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { StringValue } from 'ms';

import { JwtAuthGuard } from './guards/jwt-auth.guard';
import { APP_GUARD } from '@nestjs/core';
import { RolesGuard } from 'src/common/guards/roles.guard';

@Module({
  imports: [
    JwtModule.registerAsync({
      inject: [ConfigService],

      useFactory: (configService: ConfigService) => ({
        secret: configService.getOrThrow<string>(
          'JWT_SECRET',
        ),

        signOptions: {
          expiresIn: configService.getOrThrow<StringValue>(
            'JWT_EXPIRES_IN',
          ),
        },
      }),
    }),
  ],

  providers: [
    JwtAuthGuard,
    RolesGuard,
    {
      provide: APP_GUARD,
      useExisting: JwtAuthGuard,
    },
    {
      provide: APP_GUARD,
      useExisting: RolesGuard,
    },
  ],

  exports: [
    JwtModule,
    JwtAuthGuard,
  ],
})
export class JwtAuthModule {}