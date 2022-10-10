
import { Body, Controller, Post } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { CurrentUser } from '..//common/decorators/permission.decorator';
import { Public } from '../common/decorators/public.decorator';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';
import { UserDto } from './dto/user.dto';
@ApiTags('Auth')
@ApiBearerAuth('access-token')
@Controller('auth')
export class AuthController {
    constructor(private authService: AuthService) {}

    // @UseGuards(AuthGuard('local'))
    @Post('login')
    @Public()
    async login(@Body() loginPayload:LoginDto) {
        console.log("payload is ",loginPayload);
        return await this.authService.login(loginPayload);
    }

    // @Post('signup')
    // @Public()
    // async signUp(@Body() user: UserDto) {
    //     console.log("body of signup",user);
    //     // return await this.authService.create(user);
    // }

  
      

    
}
