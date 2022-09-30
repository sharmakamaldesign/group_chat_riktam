import { CHAT_REPOSITORY, GROUP_REPOSITORY, GROUP_USER_MAPPING_REPOSITORY, LIKE_REPOSITORY, USER_REPOSITORY, USER_ROLE_MAPPING_REPOSITORY } from '../common/constants';
import { Chat } from './entity/chat.entity';
import { Group } from './entity/group.entity';
import { GroupUserMapping } from './entity/group_user_mapping.entity';
import { Like } from './entity/like.entity';


export const chatProviders = [
    {provide: GROUP_REPOSITORY,useValue: Group},
    {provide: GROUP_USER_MAPPING_REPOSITORY,useValue: GroupUserMapping},
    {provide: CHAT_REPOSITORY,useValue: Chat},
    {provide: LIKE_REPOSITORY,useValue:Like },




];

export const chatModels = [
    Group, GroupUserMapping, Chat, Like
]