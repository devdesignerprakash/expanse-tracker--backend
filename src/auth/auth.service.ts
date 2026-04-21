import { ConflictException, Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import type{ UserDocument } from "src/user/user.schema";
import { RegisterDto } from "./register.dto";


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
        const newUser = new this.userDocument(data);
        return await newUser.save();
    }

  // Implement authentication logic here
}
