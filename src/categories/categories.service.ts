import { Inject, Injectable } from "@nestjs/common"
import {
    CATEGORY_REPOSITORY,
    CategoryRepository,
} from "@/categories/domain/category.repository"

@Injectable()
export class CategoriesService {
    constructor(
        @Inject(CATEGORY_REPOSITORY)
        private readonly categoryRepository: CategoryRepository,
    ) {}

    findAll() {
        return this.categoryRepository.findAll()
    }
}
