import { Body, Controller, Delete, Get, Param, Post, Put, Req, UseGuards } from "@nestjs/common";
import { AuthGuard } from "../auth/auth.guard";
import { IauthRequest } from "../common/authRequest.interface";
import { ApiResponse } from "../utils/api.response";
import { IncomeDto } from "./income.dto";
import { IncomeDocument } from "./income.schema";
import { IncomeService } from "./income.service";

@Controller('income')
export class IncomeController {
    constructor(private readonly incomeService: IncomeService) {}

    @UseGuards(AuthGuard)
    @Post()
    async createIncome(@Body() data: IncomeDto, @Req() req: IauthRequest): Promise<ApiResponse<IncomeDocument>> {
        data.userId = req?.user?.id;
        const income = await this.incomeService.createIncome(data);
        return new ApiResponse<IncomeDocument>({ data: income, message: "Income created successfully", statusCode: 201 });
    }

    @UseGuards(AuthGuard)
    @Get()
    async getAllIncomes(): Promise<ApiResponse<IncomeDocument[]>> {
        const incomes = await this.incomeService.getIncomes();
        return new ApiResponse<IncomeDocument[]>({ data: incomes, message: "Incomes retrieved successfully", statusCode: 200 });
    }

    @UseGuards(AuthGuard)
    @Get('user')
    async getIncomesByUserId(@Req() req: IauthRequest): Promise<ApiResponse<IncomeDocument[]>> {
        const userId = req?.user?.id;
        const incomes = await this.incomeService.getIncomesByUserId(userId);
        return new ApiResponse<IncomeDocument[]>({ data: incomes, message: "User incomes retrieved successfully", statusCode: 200 });
    }

    @UseGuards(AuthGuard)
    @Put('update/:id')
    async updateIncome(@Param('id') id: string, @Req() req: IauthRequest, @Body() data: IncomeDto): Promise<ApiResponse<IncomeDocument>> {
        const userId = req?.user?.id;
        const updatedIncome = await this.incomeService.updateIncome(id, data, userId);
        return new ApiResponse<IncomeDocument>({ data: updatedIncome, message: "Income updated successfully", statusCode: 200 });
    }

    @UseGuards(AuthGuard)
    @Delete('delete/:id')
    async deleteIncome(@Param('id') id: string, @Req() req: IauthRequest): Promise<ApiResponse<null>> {
        const userId = req?.user?.id;
        await this.incomeService.deleteIncome(id, userId);
        return new ApiResponse<null>({ data: null, message: "Income deleted successfully", statusCode: 200 });
    }
}
