import { BadRequestException, Injectable, NotFoundException } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { BudgetDto } from "./budget.dto";
import { BudgetDocument } from "./budget.schema";

@Injectable()
export class BudgetService {
    constructor(
        @InjectModel('Budget')
        private readonly budgetDocument: Model<BudgetDocument>,
    ) {}

    async createBudget(data: BudgetDto): Promise<BudgetDocument> {
        this.validateBudget(data);
        const newBudget = await this.budgetDocument.create(data);
        return newBudget.save();
    }

    async getBudgetsByUserId(userId: string): Promise<BudgetDocument[]> {
        return this.budgetDocument.find({ userId }).exec();
    }

    async updateBudget(id: string, data: BudgetDto, userId: string): Promise<BudgetDocument> {
        this.validateBudget(data);
        const updatedBudget = await this.budgetDocument.findOneAndUpdate({ _id: id, userId }, data, { new: true }).exec();
        if (!updatedBudget) {
            throw new NotFoundException('Budget not found');
        }
        return updatedBudget;
    }

    async deleteBudget(id: string, userId: string): Promise<void> {
        const deletedBudget = await this.budgetDocument.findOneAndDelete({ _id: id, userId }).exec();
        if (!deletedBudget) {
            throw new NotFoundException('Budget not found');
        }
    }

    private validateBudget(data: BudgetDto): void {
        const amount = Number(data.amount);
        if (isNaN(amount)) {
            throw new BadRequestException('Amount must be a number');
        }
        if (amount <= 0) {
            throw new BadRequestException('Amount must be greater than zero');
        }

        const startDate = new Date(data.startDate);
        const endDate = new Date(data.endDate);
        if (startDate > endDate) {
            throw new BadRequestException('End date must be after start date');
        }

        data.amount = amount;
    }
}
