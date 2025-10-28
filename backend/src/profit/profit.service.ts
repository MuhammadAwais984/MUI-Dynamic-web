import { Injectable } from '@nestjs/common';
import { PrismaService } from 'prisma/prisma.service';

@Injectable()
export class ProfitService {
  constructor(private readonly prisma: PrismaService) {}

  async getProfit() {
    const sales = await this.prisma.dashboardStats.findUnique({
      where: { name: 'sales' },
    });

    const expense = await this.prisma.dashboardStats.findUnique({
      where: { name: 'expense' },
    });

    if (!sales || !expense) {
      throw new Error('Sales or Expense data not found');
    }

    const currentProfit = sales.current_value - expense.current_value;
    const previousProfit = sales.previous_value - expense.previous_value;

    return {
      currentValue: currentProfit,
      previousValue: previousProfit,
    };
  }
}
