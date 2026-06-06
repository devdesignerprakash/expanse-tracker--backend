import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { IncomeController } from "./income.controller";
import { IncomeSchema } from "./income.schema";
import { IncomeService } from "./income.service";

@Module({
    imports: [MongooseModule.forFeature([{ name: 'Income', schema: IncomeSchema }])],
    controllers: [IncomeController],
    providers: [IncomeService],
    exports: [MongooseModule],
})
export class IncomeModule {}
