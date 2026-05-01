import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsOptional, IsString } from "class-validator";


export class ExpenseDto{
    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    title:string;

    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    description:string;

    @ApiProperty()
    @IsNotEmpty()
    amount:number;

    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    category:string;

    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    paymentMethod:string;


    @ApiProperty()
    @IsNotEmpty()
    expenseDate:Date;

    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    currency:string;

    @ApiProperty()
    @IsNotEmpty()
    isRecurring:boolean;


    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    recurringType:string;

    @ApiProperty({ type: [String] })
    @IsNotEmpty()
    tags:string[];


    @ApiProperty()
    @IsOptional()
    @IsString()
    receiptUrl?:string;

    @ApiProperty()
    @IsNotEmpty()
    userId:string;

}