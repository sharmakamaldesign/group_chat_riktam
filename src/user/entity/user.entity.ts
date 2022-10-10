import { Table, Column, Model, DataType, AllowNull, BelongsTo, ForeignKey } from 'sequelize-typescript';
import { defaultTableConfig } from '../../common/database/database.config';
import { BaseEntity } from '../../common/entity/base.entity';
import { Role } from '../../master/entity/role.entity';

@Table({
    tableName: 'info',
    schema: 'users',
    ...defaultTableConfig
})
export class User extends BaseEntity {
    @AllowNull(true)
    @Column({
        type: DataType.STRING,
        allowNull: true,
    })
    name: string;

    @AllowNull(true)
    @Column({
        type: DataType.STRING,
        allowNull: true,
    })
    email: string;

    @AllowNull(true)
    @Column({
        type: DataType.STRING,
        allowNull: true,
    })
    password: string;

    @AllowNull(true)
    @Column({
        type: DataType.STRING,
        // values: ['male', 'female'],
        allowNull: true,
    })
    gender: string;

    @AllowNull(false)
    @Column({
        type: DataType.STRING,
        unique: true,
    })
    mobile: string;

    @AllowNull(true)
    @Column({
        type: DataType.STRING,
        unique: false,
    })
    latitude: string;

    @AllowNull(true)
    @Column({
        type: DataType.STRING,
        unique: false,
    })
    longitude: string;
    
}