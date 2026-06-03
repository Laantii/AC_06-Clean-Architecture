import { Injectable } from "@nestjs/common"
import { PrismaService } from "@/shared/prisma.service"
import { Category } from "@/categories/domain/category.entity"
import { CategoryRepository } from "@/categories/domain/category.repository"

@Injectable()
export class PrismaCategoryRepository implements CategoryRepository {
    constructor(private readonly prisma: PrismaService) {}

    async findAll(): Promise<Category[]> {
        const records = await this.prisma.category.findMany({
            orderBy: { name: "asc" },
        })

        return records.map(
            (record) =>
                new Category({
                    id: record.id,
                    name: record.name,
                    slug: record.slug,
                }),
        )
    }
}
