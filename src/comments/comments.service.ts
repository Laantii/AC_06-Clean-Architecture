import {
    BadRequestException,
    Inject,
    Injectable,
    NotFoundException,
} from "@nestjs/common"
import { CreateCommentDto } from "./comments.dtos"
import { ModerationService } from "@/moderation/moderation.service"
import { PostsService } from "@/posts/posts.service"
import { CommentRepository, COMMENT_REPOSITORY } from "./domain/comment.repository"

@Injectable()
export class CommentsService {
    constructor(
        @Inject(COMMENT_REPOSITORY)
        private readonly commentRepository: CommentRepository,
        private readonly postsService: PostsService,
        private readonly moderationService: ModerationService,
    ) {}

    async listByPostId(postId: string) {
        await this.assertPostExists(postId)

        const comments = await this.commentRepository.findByPostId(postId)

        return {
            total_comments: comments.length,
            comments,
        }
    }

    async create(postId: string, data: CreateCommentDto) {
        await this.assertPostExists(postId)

        const moderation = await this.moderationService.moderate(data.content)
        if (!moderation.approved) {
            throw new BadRequestException(
                moderation.reason ?? "Comentario bloqueado por moderación",
            )
        }

        return this.commentRepository.create({
            postId,
            content: data.content,
            source: "comments-module",
        })
    }

    private async assertPostExists(postId: string) {
        const post = await this.postsService.findById(postId)
        if (!post) {
            throw new NotFoundException("Post no encontrado")
        }
    }
}