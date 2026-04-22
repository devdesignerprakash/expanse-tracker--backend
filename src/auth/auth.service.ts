import { BadRequestException, ConflictException, Injectable, NotFoundException } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import type{ UserDocument } from "src/user/user.schema";
import { RegisterDto } from "./register.dto";
import * as bcrypt from 'bcrypt';
import { LoginDto } from "./login.dto";
import { JwtService } from "@nestjs/jwt";
import { ItokenPayload } from "./token.payload.dto";
@Injectable()
export class AuthService {
    constructor(
        @InjectModel('User')
        private readonly userDocument:Model<UserDocument>,
        private readonly jwtService:JwtService

    ){}

    async createUser(data:RegisterDto):Promise<UserDocument>{
        const existuser= await this.userDocument.findOne({email:data.email});
        if(existuser){
            throw new ConflictException('User already exist with this email');
        }
        const hashedPassword= bcrypt.hash(data.password,10);
        data.password= await hashedPassword;
        const newUser = new this.userDocument(data);
        return await newUser.save();
    }
    async login(data:LoginDto):Promise<string>{
         const existuser= await this.userDocument.findOne({email:data.email});
         if(!existuser){
            throw new NotFoundException('User not found with this email');
    }
    const isPasswordMatch= await bcrypt.compare(data.password,existuser.password);
    if(!isPasswordMatch){
        throw new BadRequestException('Invalid credentials');
    }
    const payload:ItokenPayload={
        id:existuser._id.toString(),
        email:existuser.email,
        role:existuser.role
    }
    const token = this.jwtService.signAsync(payload)
    return token
}
     
}
