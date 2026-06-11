import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { IncomeDocument } from "../income/income.schema";
import { BudgetDocument } from "../budget/budget.schema";
import { ExpenseDocument } from "../expense/expense.schema";

@Injectable()
export class DashboardService {
    constructor(
        @InjectModel('Income')
        private readonly incomeModel: Model<IncomeDocument>,
        @InjectModel('Expense')
        private readonly expenseModel: Model<ExpenseDocument>,
        @InjectModel('Budget')
        private readonly budgetModel: Model<BudgetDocument>,
    ) {}

    async getTotalsByUserId(userId: string) {
        const [incomeAgg] = await this.incomeModel.aggregate([
            { $match: { userId } },
            { $group: { _id: null, total: { $sum: '$amount' } } },
        ]).exec();

        const [expenseAgg] = await this.expenseModel.aggregate([
            { $match: { userId } },
            { $group: { _id: null, total: { $sum: '$amount' } } },
        ]).exec();

        // Sum only active budgets
        const [budgetAgg] = await this.budgetModel.aggregate([
            { $match: { userId, isActive: true } },
            { $group: { _id: null, total: { $sum: '$amount' } } },
        ]).exec();

        const totalIncome = (incomeAgg && incomeAgg.total) || 0;
        const totalExpenses = (expenseAgg && expenseAgg.total) || 0;
        const totalBudget = (budgetAgg && budgetAgg.total) || 0;

        return { totalIncome, totalExpenses, totalBudget };
    }
}
