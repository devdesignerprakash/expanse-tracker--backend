import { Body, Controller, Inject, Post } from "@nestjs/common";
import { AuthService } from "./auth.service";
import { ApiResponse } from "src/utils/api.response";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import type{ UserDocument } from "src/user/user.schema";
import { RegisterDto } from "./register.dto";


@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService:AuthService,
  ){}
  @Post('/register')
  async register(@Body() data:RegisterDto):Promise<ApiResponse<UserDocument>>{
    const user= await this.authService.createUser(data)
    return new ApiResponse<UserDocument>(user,"user created successfully", 201);
  }
  // Implement authentication endpoints here
}