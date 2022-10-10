import { Body, Controller, Get, Post } from '@nestjs/common';
import { Public } from '../common/decorators/public.decorator';
import { RoleDto } from './dto/role.dto';
import { MasterService } from './master.service';

@Controller('master')
export class MasterController {
    constructor(private masterService: MasterService) {}

    @Post('role')
    @Public()
    async createRole(@Body() roleDto:RoleDto) {
        return await this.masterService.createRole(roleDto);
    }

    @Get('role')
    @Public()
    async getRole() {
        return await this.masterService.getRoles();
    }
}
