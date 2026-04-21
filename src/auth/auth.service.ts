import { ConflictException, Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import type{ UserDocument } from "src/user/user.schema";
import { RegisterDto } from "./register.dto";
import * as bcrypt from 'bcrypt';


@Injectable()
export class AuthService {
    constructor(
        @InjectModel('User')
        private readonly userDocument:Model<UserDocument>
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

  // Implement authentication logic here
}
