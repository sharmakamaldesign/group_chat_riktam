import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { UserDto } from 'src/auth/dto/user.dto';
import { CurrentUser } from 'src/common/decorators/permission.decorator';
import { Public } from 'src/common/decorators/public.decorator';
import { UserService } from './user.service';
@ApiTags('User')
@ApiBearerAuth('access-token')
@Controller('user')
export class UserController {
    constructor(private readonly userService:UserService){}

    @Post()
    createUser(@CurrentUser() user, @Body() createUserPayload:UserDto)
    {
        console.log("currentuser");
        console.log(user);
        return this.userService.create(user, createUserPayload);
    }
    
    // @Get('/user/filter')
    // @Public()
    // filter(@Query() userFilterQParams:FilterDto)
    // {
    //     console.log("filter")

    //     return this.userService.filter(userFilterQParams)
    // }

    @Get('/:id')
    getUser(@Param('id') id:string)
    {
        console.log("get by id")
        return this.userService.findOneById(id);
    }
    @Get('')
    getUsers(@CurrentUser() user)
    {
        return this.userService.getUsers();
    }
}
