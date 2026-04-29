import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { ExpenseSchema } from "./expense.schema";
import { ExpenseService } from "./expense.service";
import { ExpenseController } from "./expense.controller";

@Module({
    imports: [MongooseModule.forFeature([{ name: 'Expense', schema: ExpenseSchema }])],
    controllers: [ExpenseController],
    providers: [ExpenseService],
    exports: [MongooseModule]
})
export class ExpenseModule {}