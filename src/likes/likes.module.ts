import { Module } from "@nestjs/common"
import { LikesController } from "./likes.controller"
import { LikesService } from "./likes.service"
import { LIKE_REPOSITORY } from "./domain/like.repository"
import { PrismaLikeRepository } from "./infrastructure/prisma-like.repository"
import { PrismaModule } from "@/shared/prisma.module"
import { PostsModule } from "@/posts/posts.module"

@Module({
    imports: [PrismaModule, PostsModule],
    controllers: [LikesController],
    providers: [
        LikesService,
        {
            provide: LIKE_REPOSITORY,
            useClass: PrismaLikeRepository,
        },
    ],
})
export class LikesModule {}