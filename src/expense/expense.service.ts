import {BadRequestException, Injectable, NotFoundException } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { ExpenseDocument } from "./expense.schema";
import { ExpenseDto } from "./expense.dto";


@Injectable()
export class ExpenseService {
    @InjectModel('Expense')
    private readonly expenseDocument:Model<ExpenseDocument>;

    async createExpense(data:ExpenseDto):Promise<ExpenseDocument>{
        const amount= Number(data.amount);
        if(isNaN(amount)){
            throw new BadRequestException('Amount must be a number');
        }
        if(amount<=0){
            throw new BadRequestException('Amount must be greater than zero');
        }
        data.amount=amount;
        const newExpense = await this.expenseDocument.create(data);
        await newExpense.save()
        return newExpense;
  
    }
    async getExpense():Promise<ExpenseDocument[]>{
        const allExpenses= await this.expenseDocument.find().exec();
        return allExpenses;
    }
    async getExpenseByUserId(userId:string):Promise<ExpenseDocument[]>{
        const userExpenses= await this.expenseDocument.find({userId}).exec();
        return userExpenses;
    }
    async updateExpense(id:string,data:ExpenseDto, userId:string):Promise<ExpenseDocument>{
        const amount= Number(data.amount);
        if(isNaN(amount)){
            throw new BadRequestException('Amount must be a number');
        }
        if(amount<=0){
            throw new BadRequestException('Amount must be greater than zero');
        }
        data.amount=amount;
        const updatedExpense= await this.expenseDocument.findOneAndUpdate({_id:id,userId},data,{new:true}).exec();
        if(!updatedExpense){
            throw new NotFoundException('Expense not found');
        }
        return updatedExpense;
    }
    async deleteExpense(id:string,userId:string):Promise<void>{   
        const deletedExpense= await this.expenseDocument.findOneAndDelete({_id:id,userId}).exec();
        if(!deletedExpense){
            throw new NotFoundException('Expense not found');
        }   
        return
    }
}