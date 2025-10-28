import { Injectable } from '@nestjs/common';
import { PrismaService } from 'prisma/prisma.service';

@Injectable()
export class SalesChartService {
  constructor(private readonly prisma: PrismaService) {}

  findAll() {
    return this.prisma.sales_chart.findMany();
  }
}
