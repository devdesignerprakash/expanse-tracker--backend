import { BadRequestException, ConflictException, Injectable, NotFoundException } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { CategoryDto } from "./category.dto";
import { CategoryDocument } from "./category.schema";


@Injectable()
export class CategoryService{
    constructor(
        @InjectModel('Category')
        private readonly categoryDocument: Model<CategoryDocument>,
    ) {}

    async createCategory(data: CategoryDto): Promise<CategoryDocument> {
        this.validateCategory(data);
        try {
            const newCategory = await this.categoryDocument.create(data);
            return await newCategory.save();
        } catch (error) {
            const errAny = error as any;
            if (errAny && (errAny.code === 11000 || /duplicate key/i.test(errAny?.message || ''))) {
                throw new ConflictException('Category already exists with this name');
            }
            throw error;
        }
    }

    async getCategoriesByUserId(userId: string): Promise<CategoryDocument[]> {
        return this.categoryDocument.find({ userId, isActive: true }).sort({ name: 1 }).exec();
    }

    async updateCategory(id: string, data: CategoryDto, userId: string): Promise<CategoryDocument> {
        this.validateCategory(data);
        try {
            const updatedCategory = await this.categoryDocument.findOneAndUpdate(
                { _id: id, userId },
                data,
                { new: true },
            ).exec();

            if (!updatedCategory) {
                throw new NotFoundException('Category not found');
            }

            return updatedCategory;
        } catch (error) {
            const errAny = error as any;
            if (errAny && (errAny.code === 11000 || /duplicate key/i.test(errAny?.message || ''))) {
                throw new ConflictException('Category already exists with this name');
            }
            throw error;
        }
    }

    async deleteCategory(id: string, userId: string): Promise<void> {
        const deletedCategory = await this.categoryDocument.findOneAndUpdate(
            { _id: id, userId },
            { isActive: false },
            { new: true },
        ).exec();

        if (!deletedCategory) {
            throw new NotFoundException('Category not found');
        }
    }

    private validateCategory(data: CategoryDto): void {
        if (!data.name?.trim()) {
            throw new BadRequestException('Category name is required');
        }

        data.name = data.name.trim();
    }
}
