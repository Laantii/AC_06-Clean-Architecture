import { Injectable } from "@nestjs/common"
import { PrismaService } from "@/shared/prisma.service"
import { Post } from "@/posts/domain/post.entity"
import {
    CreatePostData,
    PostRepository,
    PostWithRelations,
} from "@/posts/domain/post.repository"

/**
 * Implementación del PostRepository usando Prisma ORM.
 * Esta clase pertenece a la capa de infraestructura y es la única
 * que conoce los detalles de persistencia.
 */
@Injectable()
export class PrismaPostRepository implements PostRepository {
    constructor(private readonly prisma: PrismaService) {}

    async create(data: CreatePostData): Promise<Post> {
        const record = await this.prisma.post.create({ data })

        return new Post({
            id: record.id,
            title: record.title,
            description: record.description,
            imageUrl: record.imageUrl,
            categoryId: record.categoryId,
            createdAt: record.createdAt,
            updatedAt: record.updatedAt,
        })
    }

    async findAll(): Promise<Post[]> {
        const records = await this.prisma.post.findMany({
            orderBy: { createdAt: "desc" },
        })

        return records.map(
            (record) =>
                new Post({
                    id: record.id,
                    title: record.title,
                    description: record.description,
                    imageUrl: record.imageUrl,
                    categoryId: record.categoryId,
                    createdAt: record.createdAt,
                    updatedAt: record.updatedAt,
                }),
        )
    }

    async findById(id: string): Promise<Post | null> {
        const record = await this.prisma.post.findUnique({ where: { id } })

        if (!record) return null

        return new Post({
            id: record.id,
            title: record.title,
            description: record.description,
            imageUrl: record.imageUrl,
            categoryId: record.categoryId,
            createdAt: record.createdAt,
            updatedAt: record.updatedAt,
        })
    }

    async findWithRelations(
        categoryId?: string,
    ): Promise<PostWithRelations[]> {
        const records = await this.prisma.post.findMany({
            where: categoryId ? { categoryId } : undefined,
            include: { comments: true, likes: true, category: true },
        })

        return records.map((record) => ({
            id: record.id,
            title: record.title,
            description: record.description,
            imageUrl: record.imageUrl,
            categoryId: record.categoryId,
            createdAt: record.createdAt,
            updatedAt: record.updatedAt,
            category: record.category
                ? { name: record.category.name }
                : null,
            comments: record.comments.map((c) => ({ id: c.id })),
            likes: record.likes.map((l) => ({ weight: l.weight })),
        }))
    }
}
