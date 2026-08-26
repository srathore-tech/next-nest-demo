import { Module } from "@nestjs/common";

import { AuthController } from "./auth.controller";
import { AuthService } from "./auth.service";
import { UsersModule } from "../users/users.module";
import { JwtAuthModule } from "src/jwt-auth/jwt-auth.module";

@Module({
  imports: [UsersModule, JwtAuthModule],

  controllers: [AuthController],

  providers: [AuthService],
})
export class AuthModule {}
