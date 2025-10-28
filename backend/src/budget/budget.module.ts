import { Module } from '@nestjs/common';
import { BudgetController } from './budget.controller';
import { BudgetService } from './budget.service';
import { PrismaService } from 'prisma/prisma.service';

@Module({
  controllers: [BudgetController],
  providers: [BudgetService, PrismaService],
})
export class BudgetModule {}
