import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { DatabaseModule } from './database/database.module';
import { dbConfig } from './database/database.config';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import { ExpenseModule } from './expense/expense.module';
import { CategoryModule } from './category/category.module';
import { BudgetModule } from './budget/budget.module';
import { IncomeModule } from './income/income.module';

@Module({
  imports: [ConfigModule.forRoot({
    isGlobal: true,
    envFilePath: '.env',
    load: [dbConfig]
  }),DatabaseModule, UserModule,AuthModule,ExpenseModule, CategoryModule, BudgetModule, IncomeModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
