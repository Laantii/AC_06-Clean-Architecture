import { Category } from "@/categories/domain/category.entity"

/**
 * Interfaz del repositorio de Categories.
 * Define el contrato de acceso a datos sin acoplar a ningún ORM.
 */
export interface CategoryRepository {
    findAll(): Promise<Category[]>
}

export const CATEGORY_REPOSITORY = "CATEGORY_REPOSITORY"
