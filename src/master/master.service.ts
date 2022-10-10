import { HttpException, Inject, Injectable } from '@nestjs/common';
import { Console } from 'console';
import { ROLE_REPOSITORY } from '../common/constants';
import { RoleDto } from './dto/role.dto';
import { Role } from './entity/role.entity';

@Injectable()
export class MasterService {
    constructor(
        @Inject(ROLE_REPOSITORY) private readonly roleRepository: typeof Role
    ) {}

    async createRole(roleDto: RoleDto) {
        console.log("roleDto"+roleDto.name);
        let existingRole = await this.roleRepository.findOne({where:{name:roleDto.name}})
        if(existingRole)
        {
            throw new HttpException(roleDto.name+' role already exist',409);
        }
        let res = await this.roleRepository.create({...roleDto});
        return res
    }
    async getRoles() {
        let res = await this.roleRepository.findAll();
        return res;
    }
}
