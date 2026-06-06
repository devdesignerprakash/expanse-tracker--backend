import { Body, Controller, Delete, Get, Param, Post, Put, Req, UseGuards } from "@nestjs/common";
import { AuthGuard } from "../auth/auth.guard";
import { IauthRequest } from "../common/authRequest.interface";
import { ApiResponse } from "../utils/api.response";
import { BudgetDto } from "./budget.dto";
import { BudgetDocument } from "./budget.schema";
import { BudgetService } from "./budget.service";

@Controller('budget')
export class BudgetController {
    constructor(private readonly budgetService: BudgetService) {}

    @UseGuards(AuthGuard)
    @Post()
    async createBudget(@Body() data: BudgetDto, @Req() req: IauthRequest): Promise<ApiResponse<BudgetDocument>> {
        data.userId = req?.user?.id;
        const budget = await this.budgetService.createBudget(data);
        return new ApiResponse<BudgetDocument>({ data: budget, message: "Budget created successfully", statusCode: 201 });
    }

    @UseGuards(AuthGuard)
    @Get('user')
    async getBudgetsByUserId(@Req() req: IauthRequest): Promise<ApiResponse<BudgetDocument[]>> {
        const userId = req?.user?.id;
        const budgets = await this.budgetService.getBudgetsByUserId(userId);
        return new ApiResponse<BudgetDocument[]>({ data: budgets, message: "User budgets retrieved successfully", statusCode: 200 });
    }

    @UseGuards(AuthGuard)
    @Put('update/:id')
    async updateBudget(@Param('id') id: string, @Req() req: IauthRequest, @Body() data: BudgetDto): Promise<ApiResponse<BudgetDocument>> {
        const userId = req?.user?.id;
        const updatedBudget = await this.budgetService.updateBudget(id, data, userId);
        return new ApiResponse<BudgetDocument>({ data: updatedBudget, message: "Budget updated successfully", statusCode: 200 });
    }

    @UseGuards(AuthGuard)
    @Delete('delete/:id')
    async deleteBudget(@Param('id') id: string, @Req() req: IauthRequest): Promise<ApiResponse<null>> {
        const userId = req?.user?.id;
        await this.budgetService.deleteBudget(id, userId);
        return new ApiResponse<null>({ data: null, message: "Budget deleted successfully", statusCode: 200 });
    }
}
