import { Table, Column, Model, DataType, AllowNull, BelongsTo, ForeignKey } from 'sequelize-typescript';
import { defaultTableConfig } from 'src/common/database/database.config';
import { BaseEntity } from 'src/common/entity/base.entity';
import { Role } from '../../master/entity/role.entity';

@Table({
    tableName: 'group',
    schema: 'chat',
    ...defaultTableConfig
})
export class Group extends BaseEntity {
    @AllowNull(true)
    @Column({
        type: DataType.STRING,
        allowNull: true,
    })
    name: string;

    @AllowNull(false)
    @Column({
        type: DataType.STRING,
        unique: true,
    })
    code: string;
}