import { HttpException, Inject, Injectable } from '@nestjs/common';
import { group } from 'console';
import { CHAT_REPOSITORY, GROUP_REPOSITORY, GROUP_USER_MAPPING_REPOSITORY, LIKE_REPOSITORY } from '../common/constants';
import { User } from '../user/entity/user.entity';
import { GroupDto } from './dto/group.dto';
import { Chat } from './entity/chat.entity';
import { Group } from './entity/group.entity';
import { GroupUserMapping } from './entity/group_user_mapping.entity';
import { Like } from './entity/like.entity';

@Injectable()
export class ChatService {
    constructor(
        @Inject(GROUP_REPOSITORY) private readonly groupRepository: typeof Group,
        @Inject(CHAT_REPOSITORY) private readonly chatRepository: typeof Chat,
        @Inject(LIKE_REPOSITORY) private readonly likeRepository: typeof Like,


        @Inject(GROUP_USER_MAPPING_REPOSITORY) private readonly groupUserMappingRepository: typeof GroupUserMapping,

    ) { }
    async createGroup(user, groupDto: GroupDto) {
        let existingGroup = await this.groupRepository.findOne({where:{code:groupDto.code}});
        console.log("exsting grou");
        console.log(existingGroup);
        if(existingGroup)
        {
            throw new HttpException("group with code "+groupDto.code+" already exist",409);
        }
        let otherDetails = {
            created_by_id:user.id
        }
        let res = await this.groupRepository.create({...groupDto, ...otherDetails});
        return res;

    }

    async getGroups(user){
        let res = await this.groupRepository.findAll();
        return res;
    }

    async deleteGroup(groupId, user)
    {
        let res = await this.groupRepository.destroy({where:{id:groupId}});
        return res;
    }

    async addGroupUser(user, addGroupUserDto){
        let res  = await this.groupUserMappingRepository.create({...addGroupUserDto});
        return res;
    }
    async getGroupUsers(user, groupId)
    {
        let res = await this.groupUserMappingRepository.findAll({where:{group_id:groupId}, include:[{model:User}]});
        return res;
    }

    async deleteGroupUser(user, userId,groupId)
    {
        let res = await this.groupUserMappingRepository.destroy({where:{group_id:groupId,user_id:userId}});
        return res;
    }

    async groupChat(user, chatDto)
    {
        let otherDetails = 
        {
            user_id: user.id
        }
        let res = await this.chatRepository.create({...chatDto, ...otherDetails});
        return res
    }

    async getGroupChats(user, groupId)
    {
        let res = await this.chatRepository.findAll({where:{group_id:groupId}});
        return res;
    }

    async likeChat(user, likeChatDto)
    {
        let existingLike = await this.likeRepository.findOne({where:{chat_id:likeChatDto.chat_id, user_id:user.id}});
        if(existingLike)
        {
            throw new HttpException("You already liked this chat",409);
        }
        let otherDetails = {
            user_id:user.id
        }
        let res = await this.likeRepository.create({...likeChatDto, ...otherDetails});
        return res;
    }

    async getLikes(user, chatId)
    {
        let res = await this.likeRepository.findAll({where:{chat_id:chatId}, include:[{model:User}]});
        return res;
    }
}
