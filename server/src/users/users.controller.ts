import { Controller, Get } from "@nestjs/common";
import { UsersService } from "./users.service";
import { CurrentUser } from "src/common/decorators/current-user.decorator";
import type { JwtPayload } from "src/common/types/jwt-payload.type";
import { Roles } from "src/common/decorators/roles.decorator";
import { Role } from "src/common/enums/role.enum";

@Controller("users")
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Roles(Role.ADMIN)
  @Get()
  findAll() {
    return this.usersService.findAll();
  }
  @Get("me")
  async getProfile(@CurrentUser() user: JwtPayload) {
    return this.usersService.findById(user.sub);
  }
}
