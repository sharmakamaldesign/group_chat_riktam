import {
    AllowNull,
    Column,
    DataType,
    Default,
    ForeignKey,
    IsBefore,
    IsDate,
    IsUUID,
    Model,
    PrimaryKey,
  } from 'sequelize-typescript';
  import { Sequelize, UUIDV4 } from 'sequelize';
  
  const LIMIT = 20;
  const OFFSET = 0;
  const ORDER = [['created_at', 'ASC']];
  
  export interface BaseEntityListType {items:any[], total:number,offset:number,limit:number}
  
  export abstract class BaseEntity<T = any, T2 = any> extends Model<T, T2> {
    @IsUUID(4)
    // @PrimaryKey
    // @Default(UUIDV4)
    @Column({  type: DataType.UUID, defaultValue: Sequelize.literal('uuid_generate_v4()'), primaryKey: true})
    id: string;
  
  
    @IsUUID(4)
    @AllowNull(true)
    @Column({ type: DataType.UUID })
    updated_by_id?: string;
  
    @IsUUID(4)
    @AllowNull(true)
    @Column({ type: DataType.UUID })
    created_by_id: string;
  
    @IsUUID(4)
    @AllowNull(true)
    @Column({ type: DataType.UUID })
    account_id: string;
  
    @IsUUID(4)
    @AllowNull(true)
    @Column({ type: DataType.UUID })
    deleted_by_id?: string;
  
    public static async listAll(model, params):Promise<BaseEntityListType> {
      const limit = params['limit'] || LIMIT;
      const offset = params['offset'] || OFFSET;
      const order = params['order'] || ORDER;
      delete params.offset;
      delete params.limit;
      delete params.order;
      const parameters: any = { limit, offset, order };
      if (params.select) {
        parameters.select = params.select;
        delete params.select;
      }
      if(params.include){
        parameters.include=params.include;
        delete params.include
      }
      parameters.where = params;
      const result = await model.findAndCountAll(parameters);
      return {
        items: result.rows,
        total: result.count,
        offset,
        limit,
      };
    }
  
    public async softDelete(currentUser) {
      // @ts-ignore
      await this.update({ ['deleted_by_id']: currentUser.id });
      return await this.destroy();
    }
  }
  