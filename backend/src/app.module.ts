import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { BudgetModule } from './budget/budget.module';
import { ProfitModule } from './profit/profit.module';
import { SalesChartModule } from './sales/sales-chart.module';
import { ProductsModule } from './products/products.module';
import { PrismaModule } from 'prisma/prisma.module'; // ✅ New Prisma module

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    PrismaModule, // ✅ Add this
    UsersModule,
    AuthModule,
    BudgetModule,
    ProfitModule,
    SalesChartModule,
    ProductsModule,
  ],
})
export class AppModule {}
