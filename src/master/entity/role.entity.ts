import { Table, Column, Model, DataType, AllowNull } from 'sequelize-typescript';
import { defaultTableConfig } from '../../common/database/database.config';
import { BaseEntity } from '../../common/entity/base.entity';

@Table({
    tableName: 'role',
    schema: 'master',
    ...defaultTableConfig
})
export class Role extends BaseEntity {
    @AllowNull(false)
    @Column({
        type: DataType.STRING,
        allowNull: false,
        unique: true,
    })
    name: string;
}