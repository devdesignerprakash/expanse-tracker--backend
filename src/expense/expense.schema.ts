import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument,Types} from 'mongoose';
import { PaymentMethod } from '../utils/paymentMethod.enum';
import { RecurringType } from '../utils/recurringType.enum';

export type ExpenseDocument = HydratedDocument<Expense>

@Schema({ timestamps: true })
export class Expense {
  @Prop({ required: true })
  title: string;

  @Prop()
  description: string;

  @Prop({ required: true })
  amount: number;

  @Prop({ required: true })
  category: string;

  @Prop({
    enum: PaymentMethod,
    default: PaymentMethod.CASH,
  })
  paymentMethod: string;

  @Prop({ default: Date.now })
  expenseDate: Date;

  @Prop({ default: 'NPR' })
  currency: string;

  @Prop({ default: false })
  isRecurring: boolean;

  @Prop({
    enum: RecurringType,
    default: RecurringType.MONTHLY,
  })
  recurringType: string;

  @Prop([String])
  tags: string[];

  @Prop()
  receiptUrl: string;

  @Prop({ default: false })
  isDeleted: boolean;

  @Prop({ type: Types.ObjectId, ref: 'User', required: true })
  userId: Types.ObjectId;
}

export const ExpenseSchema = SchemaFactory.createForClass(Expense);