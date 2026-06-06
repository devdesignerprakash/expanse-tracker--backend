import { ApiProperty } from "@nestjs/swagger";
import { IsDateString, IsEnum, IsNotEmpty, IsOptional, IsString } from "class-validator";
import { PaymentMethod } from "../utils/paymentMethod.enum";

export class IncomeDto {
    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    source: string;

    @ApiProperty()
    @IsNotEmpty()
    amount: number;

    @ApiProperty({ enum: PaymentMethod })
    @IsOptional()
    @IsEnum(PaymentMethod)
    paymentMethod?: PaymentMethod;

    @ApiProperty({ required: false })
    @IsOptional()
    @IsDateString()
    incomeDate?: Date;

    @ApiProperty({ required: false })
    @IsOptional()
    @IsString()
    currency?: string;

    @ApiProperty()
    @IsNotEmpty()
    userId: string;
}
