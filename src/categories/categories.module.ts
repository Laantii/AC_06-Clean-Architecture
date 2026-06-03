import { Module } from "@nestjs/common"
import { CategoriesController } from "@/categories/categories.controller"
import { CategoriesService } from "@/categories/categories.service"
import { CATEGORY_REPOSITORY } from "@/categories/domain/category.repository"
import { PrismaCategoryRepository } from "@/categories/infrastructure/prisma-category.repository"

@Module({
    controllers: [CategoriesController],
    providers: [
        CategoriesService,
        {
            provide: CATEGORY_REPOSITORY,
            useClass: PrismaCategoryRepository,
        },
    ],
})
export class CategoriesModule {}
