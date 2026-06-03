import { BadRequestException } from "@nestjs/common"
import { Test } from "@nestjs/testing"

import { CommentsService } from "@/comments/comments.service"
import { ModerationService } from "@/moderation/moderation.service"
import { PostsService } from "@/posts/posts.service"
import { COMMENT_REPOSITORY } from "@/comments/domain/comment.repository"

describe("CommentsService", () => {
    let service: CommentsService

    const commentRepositoryMock = {
        create: jest.fn(),
    }

    const postsMock = {
        findById: jest.fn(),
    }

    const moderationMock = {
        moderate: jest.fn(),
    }

    beforeEach(async () => {
        const moduleRef = await Test.createTestingModule({
            providers: [
                CommentsService,
                {
                    provide: COMMENT_REPOSITORY,
                    useValue: commentRepositoryMock,
                },
                {
                    provide: PostsService,
                    useValue: postsMock,
                },
                {
                    provide: ModerationService,
                    useValue: moderationMock,
                },
            ],
        }).compile()

        service = moduleRef.get(CommentsService)
    })

    it("blocks moderated comment", async () => {
        postsMock.findById.mockResolvedValue({
            id: "1",
        })

        moderationMock.moderate.mockResolvedValue({
            approved: false,
            reason: "bloqueado",
        })

        await expect(
            service.create("1", {
                content: "spam",
            }),
        ).rejects.toThrow(BadRequestException)
    })

    it("creates approved comment", async () => {
        postsMock.findById.mockResolvedValue({
            id: "1",
        })

        moderationMock.moderate.mockResolvedValue({
            approved: true,
        })

        commentRepositoryMock.create.mockResolvedValue({
            id: "1",
        })

        await service.create("1", {
            content: "comentario valido",
        })

        expect(commentRepositoryMock.create).toHaveBeenCalled()
    })
})