import { Module } from "@nestjs/common"
import { FeedRankingStrategyFactory } from "@/posts/feed-ranking.strategy"
import { ModerationModule } from "@/moderation/moderation.module"
import { PostsController } from "@/posts/posts.controller"
import { PostsService } from "@/posts/posts.service"
import { POST_REPOSITORY } from "@/posts/domain/post.repository"
import { PrismaPostRepository } from "@/posts/infrastructure/prisma-post.repository"

@Module({
    imports: [ModerationModule],
    controllers: [PostsController],
    providers: [
        PostsService,
        FeedRankingStrategyFactory,
        {
            provide: POST_REPOSITORY,
            useClass: PrismaPostRepository,
        },
    ],
    exports: [PostsService],
})
export class PostsModule {}
