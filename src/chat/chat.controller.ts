import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { group } from 'console';
import { userInfo } from 'os';
import { CurrentUser } from 'src/common/decorators/permission.decorator';
import { ChatService } from './chat.service';
import { AddGroupUserDto } from './dto/add_group_user.dto';
import { ChatDto } from './dto/chat.dto';
import { GroupDto } from './dto/group.dto';
import { LikeChatDto } from './dto/like_chat.dto';
@ApiTags('Chat')
@ApiBearerAuth('access-token')
@Controller('chat')
export class ChatController {
    constructor(private readonly chatService:ChatService){}


    @Post('group')
    createGroup(@CurrentUser() user, @Body() groupDto:GroupDto)
    {
        return this.chatService.createGroup(user, groupDto);
    }
    @Get('group')
    getGroups(@CurrentUser() user)
    {
        return this.chatService.getGroups(user);
    }

    @Delete('group/:id')
    deleteGroup(@CurrentUser() user, @Param('id') groupId:string)
    {
        return this.chatService.deleteGroup(groupId, user);
    }

    @Post('group/user')
    addGroupUser(@CurrentUser() user, @Body() addGroupUserDto:AddGroupUserDto)
    {
        return this.chatService.addGroupUser(user, addGroupUserDto);
    }
    @Get('group/users/:groupId')
    getGroupUsers(@CurrentUser() user,@Param('groupId') groupId:string)
    {
        return this.chatService.getGroupUsers(user, groupId);
    }

    @Delete('group/user/:groupId/:userId')
    deleteGroupUser(@CurrentUser() user,@Param('userId') userId:string, @Param('groupId') groupId:string)
    {   console.log("user id  and group id", userId, groupId);
        return this.chatService.deleteGroupUser(user, userId, groupId);
    }

    @Post('')
    groupChat(@CurrentUser() user, @Body() chatDto:ChatDto){
        return this.chatService.groupChat(user, chatDto);
    }
    @Get(':groupId')
    getGroupChats(@CurrentUser() user, @Param('groupId') groupId:string){
        return this.chatService.getGroupChats(user, groupId);
    }

    @Post('like')
    likeChat(@CurrentUser() user, @Body() likeChatDto:LikeChatDto){
        return this.chatService.likeChat(user, likeChatDto);
    }

    @Get('like/:chatId')
    getLikes(@CurrentUser() user, @Param('chatId') chatId:string){
        return this.chatService.getLikes(user, chatId);
    }
}
