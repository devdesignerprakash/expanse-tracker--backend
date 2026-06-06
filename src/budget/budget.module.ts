import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { BudgetController } from "./budget.controller";
import { BudgetSchema } from "./budget.schema";
import { BudgetService } from "./budget.service";

@Module({
    imports: [MongooseModule.forFeature([{ name: 'Budget', schema: BudgetSchema }])],
    controllers: [BudgetController],
    providers: [BudgetService],
    exports: [MongooseModule],
})
export class BudgetModule {}
