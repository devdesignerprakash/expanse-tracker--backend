import { Controller, Get, Req, UseGuards } from "@nestjs/common";
import { DashboardService } from "./dashboard.service";
import { AuthGuard } from "../auth/auth.guard";
import { ApiResponse } from "../utils/api.response";
import { IauthRequest } from "../common/authRequest.interface";

@Controller('dashboard')
export class DashboardController {
    constructor(private readonly dashboardService: DashboardService) {}

    @UseGuards(AuthGuard)
    @Get()
    async getDashboard(@Req() req: IauthRequest): Promise<ApiResponse<any>> {
        const userId = req?.user?.id;
        const totals = await this.dashboardService.getTotalsByUserId(userId);
        return new ApiResponse({ data: totals, message: 'Dashboard totals retrieved', statusCode: 200 });
    }
}
