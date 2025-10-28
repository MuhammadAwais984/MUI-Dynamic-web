import { Injectable } from '@nestjs/common';
import { PrismaService } from 'prisma/prisma.service';

@Injectable()
export class BudgetService {
  constructor(private readonly prisma: PrismaService) {}

  async getBudget() {
    const budget = await this.prisma.dashboardStats.findUnique({
      where: { name: 'budget' },
    });

    return {
      currentValue: budget?.current_value || 0,
      previousValue: budget?.previous_value || 0,
    };
  }
}
