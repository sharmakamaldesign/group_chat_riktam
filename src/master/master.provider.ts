import { Role } from '../master/entity/role.entity';
import { ROLE_REPOSITORY } from '../common/constants';

export const masterProviders = [
    {provide: ROLE_REPOSITORY,useValue: Role},


];

export const masterModels = [
    Role
]