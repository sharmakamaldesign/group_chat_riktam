import { Table, Column, Model, DataType, AllowNull, BelongsTo, ForeignKey, IsUUID } from 'sequelize-typescript';
import { defaultTableConfig } from '../../common/database/database.config';
import { BaseEntity } from '../../common/entity/base.entity';
import { User } from '../../user/entity/user.entity';
import { Role } from '../../master/entity/role.entity';
import { Group } from './group.entity';

@Table({
    tableName: 'info',
    schema: 'chat',
    ...defaultTableConfig
})
export class Chat extends BaseEntity {
    @AllowNull(true)
    @Column({
        type: DataType.STRING,
        allowNull: true,
    })
    message: string;

    @ForeignKey(()=>User)
    @IsUUID(4)
    @AllowNull(false)
    @Column({type:DataType.UUID})
    user_id: string;

    @ForeignKey(()=>Group)
    @IsUUID(4)
    @AllowNull(false)
    @Column({type:DataType.UUID})
    group_id: string;


    @BelongsTo(()=>Group)
    group:Group

    @BelongsTo(()=>User)
    user:User
}