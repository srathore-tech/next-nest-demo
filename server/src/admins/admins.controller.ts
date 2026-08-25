import { Controller, Get } from '@nestjs/common';
import { Public } from 'src/common/decorators/public.decorator';
import { Roles } from 'src/common/decorators/roles.decorator';
import { Role } from 'src/common/enums/role.enum';


@Controller('admins')
export class AdminsController {
    @Get("users")
    @Roles(Role.ADMIN)
    getUsers(){
        return {message:"Only admin can access this"}
    }
}
