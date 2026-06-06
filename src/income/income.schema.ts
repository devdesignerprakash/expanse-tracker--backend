import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { HydratedDocument, Types } from "mongoose";
import { PaymentMethod } from "../utils/paymentMethod.enum";


export type IncomeDocument= HydratedDocument<Income>;

@Schema({ timestamps: true })
export class Income{
   @Prop({ type: String, required: true, trim: true })
   source: string;

   @Prop({ type: Number, required: true, min: 1 })
   amount: number;

   @Prop({
      type: String,
      enum: PaymentMethod,
      default: PaymentMethod.CASH,
   })
   paymentMethod: string;

   @Prop({ default: Date.now })
   incomeDate: Date;

   @Prop({ default: 'NPR' })
   currency: string;

   @Prop({ type: Types.ObjectId, ref: 'User', required: true })
   userId: Types.ObjectId;
}

export const IncomeSchema = SchemaFactory.createForClass(Income);
