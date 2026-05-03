import { Module } from "@nestjs/common";
import { CategoryServices } from "./category.service";
import { CategoryControllers } from "./category.controller";
import { MongooseModule } from "@nestjs/mongoose";
import { CategorySchema } from "./category.schema";

@Module({
    imports:[MongooseModule.forFeature([{name:'Category', schema:CategorySchema}])],
    controllers:[CategoryControllers],
    providers:[CategoryServices],
    exports:[MongooseModule]
})
export class CategoryModule{}