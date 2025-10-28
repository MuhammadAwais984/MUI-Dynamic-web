import { Controller, Get } from '@nestjs/common';
import { SalesChartService } from './sales-chart.service';

@Controller('sales-chart')
export class SalesChartController {
  constructor(private readonly service: SalesChartService) {}

  @Get()
  async getAll() {
    const records = await this.service.findAll();
    return records.map((entry) => ({
      name: entry.month,
      current: entry.current_value,
      previous: entry.previous_value,
    }));
  }
}
