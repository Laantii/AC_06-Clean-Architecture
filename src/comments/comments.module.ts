import { Module } from "@nestjs/common"
import { CommentsController } from "./comments.controller"
import { CommentsService } from "./comments.service"
import { COMMENT_REPOSITORY } from "./domain/comment.repository"
import { PrismaCommentRepository } from "./infrastructure/prisma-comment.repository"
import { PrismaModule } from "@/shared/prisma.module"
import { PostsModule } from "@/posts/posts.module"
import { ModerationModule } from "@/moderation/moderation.module"

@Module({
    imports: [PrismaModule, PostsModule, ModerationModule],
    controllers: [CommentsController],
    providers: [
        CommentsService,
        {
            provide: COMMENT_REPOSITORY,
            useClass: PrismaCommentRepository,
        },
    ],
})
export class CommentsModule {}