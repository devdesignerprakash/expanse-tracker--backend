import { ApiProperty } from "@nestjs/swagger";
import { IsDateString, IsEnum, IsNotEmpty, IsOptional, IsString } from "class-validator";
import { Period } from "../utils/period.enum";

export class BudgetDto {
    @ApiProperty()
    @IsNotEmpty()
    amount: number;

    @ApiProperty({ enum: Period })
    @IsNotEmpty()
    @IsEnum(Period)
    period: Period;

    @ApiProperty()
    @IsNotEmpty()
    @IsDateString()
    startDate: Date;

    @ApiProperty()
    @IsNotEmpty()
    @IsDateString()
    endDate: Date;

    @ApiProperty({ required: false })
    @IsOptional()
    isActive?: boolean;

    @ApiProperty({ required: false })
    @IsOptional()
    @IsString()
    categoryId?: string;

    @ApiProperty()
    @IsNotEmpty()
    userId: string;
}
