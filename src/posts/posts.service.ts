import { BadRequestException, Inject, Injectable } from "@nestjs/common"
import { CreatePostDto } from "@/posts/posts.dtos"
import {
    POST_REPOSITORY,
    PostRepository,
} from "@/posts/domain/post.repository"
import { ModerationService } from "@/moderation/moderation.service"

@Injectable()
export class PostsService {
    constructor(
        @Inject(POST_REPOSITORY)
        private readonly postRepository: PostRepository,
        private readonly moderationService: ModerationService,
    ) {}

    async create(data: CreatePostDto) {
        const text = `${data.title} ${data.description}`
        const moderation = await this.moderationService.moderate(text)

        if (!moderation.approved) {
            throw new BadRequestException(
                moderation.reason ?? "Post bloqueado por moderación",
            )
        }

        return await this.postRepository.create({
            title: data.title,
            description: data.description,
            imageUrl: data.imageUrl,
            categoryId: data.categoryId,
        })
    }

    findAll() {
        return this.postRepository.findAll()
    }

    findById(id: string) {
        return this.postRepository.findById(id)
    }

    async getFeedPosts(categoryId?: string) {
        const posts = await this.postRepository.findWithRelations(categoryId)

        return posts.map((post) => ({
            id: post.id,
            title: post.title,
            description: post.description,
            imageUrl: post.imageUrl,
            categoryId: post.categoryId,
            category: post.category?.name ?? null,
            createdAt: post.createdAt,
            updatedAt: post.updatedAt,
            likesCount: post.likes.reduce((sum, l) => sum + l.weight, 0),
            commentsCount: post.comments.length,
            relevanceScore: 0,
        }))
    }
}
