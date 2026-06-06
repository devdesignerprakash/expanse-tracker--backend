import { Body, Controller, Delete, Get, Param, Post, Put, Req, UseGuards } from "@nestjs/common";
import { AuthGuard } from "../auth/auth.guard";
import { IauthRequest } from "../common/authRequest.interface";
import { ApiResponse } from "../utils/api.response";
import { CategoryDto } from "./category.dto";
import { CategoryDocument } from "./category.schema";
import { CategoryService } from "./category.service";


@Controller('category')
export class CategoryController{
    constructor(private readonly categoryService: CategoryService) {}

    @UseGuards(AuthGuard)
    @Post()
    async createCategory(@Body() data: CategoryDto, @Req() req: IauthRequest): Promise<ApiResponse<CategoryDocument>> {
        data.userId = req?.user?.id;
        const category = await this.categoryService.createCategory(data);
        return new ApiResponse<CategoryDocument>({ data: category, message: "Category created successfully", statusCode: 201 });
    }

    @UseGuards(AuthGuard)
    @Get('user')
    async getCategoriesByUserId(@Req() req: IauthRequest): Promise<ApiResponse<CategoryDocument[]>> {
        const userId = req?.user?.id;
        const categories = await this.categoryService.getCategoriesByUserId(userId);
        return new ApiResponse<CategoryDocument[]>({ data: categories, message: "User categories retrieved successfully", statusCode: 200 });
    }

    @UseGuards(AuthGuard)
    @Put('update/:id')
    async updateCategory(@Param('id') id: string, @Req() req: IauthRequest, @Body() data: CategoryDto): Promise<ApiResponse<CategoryDocument>> {
        const userId = req?.user?.id;
        const updatedCategory = await this.categoryService.updateCategory(id, data, userId);
        return new ApiResponse<CategoryDocument>({ data: updatedCategory, message: "Category updated successfully", statusCode: 200 });
    }

    @UseGuards(AuthGuard)
    @Delete('delete/:id')
    async deleteCategory(@Param('id') id: string, @Req() req: IauthRequest): Promise<ApiResponse<null>> {
        const userId = req?.user?.id;
        await this.categoryService.deleteCategory(id, userId);
        return new ApiResponse<null>({ data: null, message: "Category deleted successfully", statusCode: 200 });
    }
}
