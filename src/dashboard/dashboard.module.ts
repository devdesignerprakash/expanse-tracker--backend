import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { DashboardController } from "./dashboard.controller";
import { DashboardService } from "./dashboard.service";
import { IncomeSchema } from "../income/income.schema";
import { ExpenseSchema } from "../expense/expense.schema";
import { BudgetSchema } from "../budget/budget.schema";

@Module({
    imports: [
        MongooseModule.forFeature([
            { name: 'Income', schema: IncomeSchema },
            { name: 'Expense', schema: ExpenseSchema },
            { name: 'Budget', schema: BudgetSchema },
        ]),
    ],
    controllers: [DashboardController],
    providers: [DashboardService],
})
export class DashboardModule {}
