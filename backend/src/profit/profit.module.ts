import { Module } from '@nestjs/common';
import { ProfitController } from './profit.controller';
import { ProfitService } from './profit.service';
import { PrismaService } from 'prisma/prisma.service';

@Module({
  controllers: [ProfitController],
  providers: [ProfitService, PrismaService],
})
export class ProfitModule {}
