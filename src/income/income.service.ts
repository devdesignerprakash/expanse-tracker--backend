import { BadRequestException, Injectable, NotFoundException } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { IncomeDto } from "./income.dto";
import { IncomeDocument } from "./income.schema";

@Injectable()
export class IncomeService {
    constructor(
        @InjectModel('Income')
        private readonly incomeDocument: Model<IncomeDocument>,
    ) {}

    async createIncome(data: IncomeDto): Promise<IncomeDocument> {
        this.validateIncome(data);
        const newIncome = await this.incomeDocument.create(data);
        return newIncome.save();
    }

    async getIncomes(): Promise<IncomeDocument[]> {
        return this.incomeDocument.find().sort({ incomeDate: -1 }).exec();
    }

    async getIncomesByUserId(userId: string): Promise<IncomeDocument[]> {
        return this.incomeDocument.find({ userId }).sort({ incomeDate: -1 }).exec();
    }

    async updateIncome(id: string, data: IncomeDto, userId: string): Promise<IncomeDocument> {
        this.validateIncome(data);
        const updatedIncome = await this.incomeDocument.findOneAndUpdate({ _id: id, userId }, data, { new: true }).exec();
        if (!updatedIncome) {
            throw new NotFoundException('Income not found');
        }
        return updatedIncome;
    }

    async deleteIncome(id: string, userId: string): Promise<void> {
        const deletedIncome = await this.incomeDocument.findOneAndDelete({ _id: id, userId }).exec();
        if (!deletedIncome) {
            throw new NotFoundException('Income not found');
        }
    }

    private validateIncome(data: IncomeDto): void {
        if (!data.source?.trim()) {
            throw new BadRequestException('Income source is required');
        }

        const amount = Number(data.amount);
        if (isNaN(amount)) {
            throw new BadRequestException('Amount must be a number');
        }
        if (amount <= 0) {
            throw new BadRequestException('Amount must be greater than zero');
        }

        data.source = data.source.trim();
        data.amount = amount;
    }
}
