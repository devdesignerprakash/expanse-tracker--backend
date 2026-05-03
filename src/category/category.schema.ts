import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { HydratedDocument } from "mongoose";
import * as mongoose from "mongoose";
import { categoryType } from "../utils/categoryType.enum";

export type CategoryDocument = HydratedDocument<Category>;

@Schema({ timestamps: true })
export class Category {

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true })
  userId: mongoose.Types.ObjectId;

  @Prop({ type: String, required: true, trim: true })
  name: string;

  @Prop({ 
    type:String,
    enum: categoryType, 
    default: categoryType.EXPENSE
  })
  type: categoryType

  @Prop({ type: String, default: null })
  icon?: string; 

  @Prop({ type: String, default: null })
  color?: string; 

  @Prop({ type: Boolean, default: true })
  isActive: boolean;
}
export const CategorySchema= SchemaFactory.createForClass(Category)

CategorySchema.index({userId:1, name:1}, {unique:true, collation:{locale:'en', strength:2}})