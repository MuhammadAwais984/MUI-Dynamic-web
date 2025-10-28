import { Module } from '@nestjs/common';
import { SalesChartService } from './sales-chart.service';
import { SalesChartController } from './sales-chart.controller';
import { PrismaService } from 'prisma/prisma.service';

@Module({
  providers: [SalesChartService, PrismaService],
  controllers: [SalesChartController],
})
export class SalesChartModule {}
