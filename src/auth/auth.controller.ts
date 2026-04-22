import { Body, Controller, Post, Res } from "@nestjs/common";
import { AuthService } from "./auth.service";
import { ApiResponse } from "src/utils/api.response";
import type{ UserDocument } from "src/user/user.schema";
import { RegisterDto } from "./register.dto";
import { LoginDto } from "./login.dto";
import type{ Response } from "express";


@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService:AuthService,
  ){}
  @Post('/register')
  async register(@Body() data:RegisterDto):Promise<ApiResponse<UserDocument>>{
    const user= await this.authService.createUser(data)
    return new ApiResponse<UserDocument>({ data: user, message: "user created successfully", statusCode: 201 });
  }
  @Post('/login')
  async login(@Body() 
  data:LoginDto, 
  @Res({passthrough:true})response:Response
):Promise<ApiResponse<string>>
{
    const accessToken= await this.authService.login(data);
     response.cookie('auth-token', accessToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 60 * 60 * 1000, // 1 hour in milliseconds
    });

    return new ApiResponse<string>({message:"user logged in successfully"});
  }
}