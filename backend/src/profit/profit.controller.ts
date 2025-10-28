import { Controller, Get } from '@nestjs/common';
import { ProfitService } from './profit.service';

@Controller('api/profit')
export class ProfitController {
  constructor(private readonly profitService: ProfitService) {}

  @Get()
  async getProfit() {
    return await this.profitService.getProfit();
  }
}
