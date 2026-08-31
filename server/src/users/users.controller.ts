import { Body, Controller, Get, Patch } from "@nestjs/common";
import { UsersService } from "./users.service";
import { CurrentUser } from "src/common/decorators/current-user.decorator";
import type { JwtPayload } from "src/common/types/jwt-payload.type";
import { Roles } from "src/common/decorators/roles.decorator";
import { Role } from "src/common/enums/role.enum";
import { UpdateUserDto } from "./dto/update.user.dto";
import { ChangePasswordDto } from "./dto/change-password.dto";

@Controller("users")
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  // @Roles(Role.ADMIN)
  @Get("getAll")
  findAll() {
    return this.usersService.findAll();
  }

  @Get("me")
  async getProfile(@CurrentUser() user: JwtPayload) {
    return this.usersService.findById(user.sub);
  }

  @Patch("me")
  updateProfile(@Body() body: UpdateUserDto, @CurrentUser() user: JwtPayload) {
    return this.usersService.update(user.sub, body);
  }

  @Patch("me/password")
  changePassword(
    @Body() changePasswordDto: ChangePasswordDto,
    @CurrentUser() user: JwtPayload,
  ) {
    return this.usersService.changePassword(user.sub, changePasswordDto);
  }
}
