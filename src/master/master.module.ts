import { Module } from '@nestjs/common';
import { MasterController } from './master.controller';
import { masterProviders } from './master.provider';
import { MasterService } from './master.service';

@Module({
    controllers:[MasterController],
    providers:[MasterService, ...masterProviders]
})
export class MasterModule {}
