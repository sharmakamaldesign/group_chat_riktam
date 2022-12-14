import { Sequelize } from 'sequelize-typescript';
import { chatModels } from '../../chat/chat.provider';
import { masterModels } from '../../master/master.provider';
import { userModels } from '../../user/user.provider';

import { SEQUELIZE, DEVELOPMENT, TEST, PRODUCTION } from '../constants';
import { databaseConfig } from './database.config';

export const databaseProviders = [{
    provide: SEQUELIZE,
    useFactory: async () => {
        let config;
        switch (process.env.NODE_ENV) {
        case DEVELOPMENT:
           config = databaseConfig.development;
           break;
        case TEST:
           config = databaseConfig.test;
           break;
        case PRODUCTION:
           config = databaseConfig.production;
           break;
        default:
           config = databaseConfig.development;
        }
        const sequelize = new Sequelize(config);
        sequelize.addModels([
           ...userModels, 
         ...masterModels,
         ...chatModels
         ]);
        await sequelize.sync({alter:false});
        return sequelize;
    },
}];