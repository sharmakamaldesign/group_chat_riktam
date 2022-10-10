import { Table, Column, Model, DataType, AllowNull, BelongsTo, ForeignKey, IsUUID } from 'sequelize-typescript';
import { defaultTableConfig } from '../../common/database/database.config';
import { BaseEntity } from '../../common/entity/base.entity';
import { User } from '../../user/entity/user.entity';
import { Role } from '../../master/entity/role.entity';
import { Chat } from './chat.entity';
import { Group } from './group.entity';

@Table({
    tableName: 'like',
    schema: 'chat',
    ...defaultTableConfig
})
export class Like extends BaseEntity {
    @ForeignKey(()=>User)
    @IsUUID(4)
    @AllowNull(false)
    @Column({type:DataType.UUID})
    user_id: string;

    @ForeignKey(()=>Chat)
    @IsUUID(4)
    @AllowNull(false)
    @Column({type:DataType.UUID})
    chat_id: string;


    @BelongsTo(()=>Chat)
    chat:Chat

    @BelongsTo(()=>User)
    user:User
}