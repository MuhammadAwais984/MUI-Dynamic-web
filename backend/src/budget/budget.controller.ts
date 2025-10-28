import { Controller, Get } from '@nestjs/common';
import { BudgetService } from './budget.service';

@Controller('api/budget')
export class BudgetController {
  constructor(private readonly budgetService: BudgetService) {}

  @Get()
  async getBudget() {
    return this.budgetService.getBudget();
  }
}
