import {
    BadRequestException,
    Inject,
    Injectable,
    NotFoundException,
} from "@nestjs/common"
import { AddLikeDto } from "./likes.dtos"
import { PostsService } from "@/posts/posts.service"
import { LikeRepository, LIKE_REPOSITORY } from "./domain/like.repository"

@Injectable()
export class LikesService {
    constructor(
        @Inject(LIKE_REPOSITORY)
        private readonly likeRepository: LikeRepository,
        private readonly postsService: PostsService,
    ) {}

    async create(postId: string, data: AddLikeDto) {
        await this.assertPostExists(postId)

        const weight = data.weight ?? 1

        if (weight < 1) {
            throw new BadRequestException("El peso debe ser al menos 1")
        }

        return this.likeRepository.create({
            postId,
            reactionType: data.reactionType ?? "like",
            weight,
            source: "likes-module",
        })
    }

    private async assertPostExists(postId: string) {
        const post = await this.postsService.findById(postId)

        if (!post) {
            throw new NotFoundException("Post no encontrado")
        }
    }
}