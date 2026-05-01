import { Body, Controller, Delete, Get, Param, Post, Put, Req, UseGuards} from "@nestjs/common";
import { ExpenseDto } from "./expense.dto";
import { ExpenseService } from "./expense.service";
import { AuthGuard } from "../auth/auth.guard";
import { ApiResponse } from "../utils/api.response";
import { ExpenseDocument } from "./expense.schema";
import { IauthRequest } from "../common/authRequest.interface";


@Controller('expense')
export class ExpenseController {
    constructor(private readonly expenseService:ExpenseService,
    ){}
    @UseGuards(AuthGuard)
    @Post()
    async createExpense(@Body() data:ExpenseDto,@Req() req:IauthRequest):Promise<ApiResponse<ExpenseDocument>>{
        const userId=req?.user?.id;
        data.userId=userId;
        const expense= await this.expenseService.createExpense(data);
        return new ApiResponse<ExpenseDocument>({ data: expense, message: "Expense created successfully", statusCode: 201 });
    }
    @UseGuards(AuthGuard)
    @Get()
    async getAllExpenses():Promise<ApiResponse<ExpenseDocument[]>>{
        const expenses= await this.expenseService.getExpense();
        return new ApiResponse<ExpenseDocument[]>({ data: expenses, message: "Expenses retrieved successfully", statusCode: 200 });
    }

    @UseGuards(AuthGuard)
    @Get('user')
    async getExpensesByUserId(@Req() req:IauthRequest):Promise<ApiResponse<ExpenseDocument[]>>{
        const userId=req?.user?.id;
        const expenses= await this.expenseService.getExpenseByUserId(userId);
        return new ApiResponse<ExpenseDocument[]>({ data: expenses, message: "User expenses retrieved successfully", statusCode: 200 });
    }
    @UseGuards(AuthGuard)
    @Put('update/:id')
    async updateExpense(@Param('id') id:string,@Req() req:IauthRequest,@Body() data:ExpenseDto):Promise<ApiResponse<ExpenseDocument>>{
        const userId=req?.user?.id;
        const updatedExpense= await this.expenseService.updateExpense(id,data,userId);
        return new ApiResponse<ExpenseDocument>({ data: updatedExpense, message: "Expense updated successfully", statusCode: 200 });
    }
    @UseGuards(AuthGuard)
    @Delete('delete/:id')
    async deleteExpense(@Param('id') id:string,@Req() req:IauthRequest):Promise<ApiResponse<null>>{
        const userId= req?.user?.id
        await this.expenseService.deleteExpense(id,userId);
        return new ApiResponse<null>({ data: null, message: "Expense deleted successfully", statusCode: 200 });
    }
}