import { USER_REPOSITORY, USER_ROLE_MAPPING_REPOSITORY } from '../common/constants';
import { UserRoleMapping } from './entity/user-role-mapping.entity';
import { User } from './entity/user.entity';

export const userProviders = [
    {provide: USER_REPOSITORY,useValue: User},
    {provide: USER_ROLE_MAPPING_REPOSITORY,useValue: UserRoleMapping},

];

export const userModels = [
    User, UserRoleMapping
]