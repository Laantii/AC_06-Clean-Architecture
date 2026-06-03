import { BadRequestException } from "@nestjs/common"
import { Test } from "@nestjs/testing"

import { LikesService } from "@/likes/likes.service"
import { PostsService } from "@/posts/posts.service"
import { LIKE_REPOSITORY } from "@/likes/domain/like.repository"

describe("LikesService", () => {
    let service: LikesService

    const likeRepositoryMock = {
        create: jest.fn(),
    }

    const postsMock = {
        findById: jest.fn(),
    }

    beforeEach(async () => {
        const moduleRef = await Test.createTestingModule({
            providers: [
                LikesService,
                {
                    provide: LIKE_REPOSITORY,
                    useValue: likeRepositoryMock,
                },
                {
                    provide: PostsService,
                    useValue: postsMock,
                },
            ],
        }).compile()

        service = moduleRef.get(LikesService)
    })

    it("rejects weight below one", async () => {
        postsMock.findById.mockResolvedValue({
            id: "1",
        })

        await expect(
            service.create("1", {
                weight: 0,
            }),
        ).rejects.toThrow(BadRequestException)
    })

    it("uses default weight", async () => {
        postsMock.findById.mockResolvedValue({
            id: "1",
        })

        likeRepositoryMock.create.mockResolvedValue({
            id: "1",
        })

        await service.create("1", {})

        expect(likeRepositoryMock.create).toHaveBeenCalledWith(
            expect.objectContaining({
                weight: 1,
            }),
        )
    })
})