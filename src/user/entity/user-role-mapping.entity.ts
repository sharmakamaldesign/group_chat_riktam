import { Table, Column, Model, DataType, AllowNull, ForeignKey, BelongsTo, IsUUID } from 'sequelize-typescript';
import { defaultTableConfig } from 'src/common/database/database.config';
import { BaseEntity } from 'src/common/entity/base.entity';
import { Role } from 'src/master/entity/role.entity';
import { User } from './user.entity';


@Table({
    tableName: 'user_role_mapping',
    schema: 'users',
    ...defaultTableConfig,
    indexes: [
        {
            unique: true,
            fields: ['role_id', 'user_id']
        }
    ]
})
export class UserRoleMapping extends BaseEntity {

    @ForeignKey(()=>Role)
    @IsUUID(4)
    @AllowNull(false)
    @Column({type:DataType.UUID})
    role_id: string;

    @ForeignKey(()=>User)
    @IsUUID(4)
    @AllowNull(false)
    @Column({type:DataType.UUID})
    user_id: string;


    @BelongsTo(()=>Role)
    role:Role

    @BelongsTo(()=>User)
    user:User

}