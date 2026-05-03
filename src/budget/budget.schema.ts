import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { HydratedDocument, Types } from "mongoose";
import { Period } from "../utils/period.enum";

export type BudgetDocument= HydratedDocument<Budget>

@Schema({timestamps:true})
export class Budget{
    @Prop({type:Number, required:true, min:1})
    amount:number
    @Prop({enum:Period, required:true })
    period:Period

    @Prop({type:Date, required:true})
    startDate:Date

     @Prop({type:Date, required:true})
    endDate:Date

    @Prop({type:Boolean, default:true})
    isActive:boolean

    @Prop({type:Types.ObjectId, ref:'User', required:true})
    userId:Types.ObjectId

    @Prop({type:Types.ObjectId, ref:'Category', required:false})
    categoryId:Types.ObjectId
}

export const BudgetSchema= SchemaFactory.createForClass(Budget)