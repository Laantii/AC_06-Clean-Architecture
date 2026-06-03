import { Test } from "@nestjs/testing"

import { ModerationService } from "@/moderation/moderation.service"
import { MODERATION_REPOSITORY } from "@/moderation/domain/moderation.repository"

describe("ModerationService", () => {
    let moderationService: ModerationService
    let repository: any

    beforeEach(async () => {
        const moduleRef = await Test.createTestingModule({
            providers: [
                ModerationService,
                {
                    provide: MODERATION_REPOSITORY,
                    useValue: {
                        findAll: jest.fn(),
                    },
                },
            ],
        }).compile()

        moderationService =
            moduleRef.get<ModerationService>(ModerationService)

        repository = moduleRef.get(MODERATION_REPOSITORY)
    })

    it("approves clean text", async () => {
        repository.findAll.mockResolvedValue([])

        const result = await moderationService.moderate(
            "texto completamente limpio",
        )

        expect(result.approved).toBe(true)
    })

    it("blocks prohibited word", async () => {
        repository.findAll.mockResolvedValue([
            {
                id: "1",
                word: "spam",
                category: "GENERAL",
                createdAt: new Date(),
            },
        ])

        const result = await moderationService.moderate(
            "esto contiene spam",
        )

        expect(result.approved).toBe(false)
        expect(result.category).toBe("GENERAL")
    })

    it("detects fuzzy match", async () => {
        repository.findAll.mockResolvedValue([
            {
                id: "1",
                word: "spam",
                category: "GENERAL",
                createdAt: new Date(),
            },
        ])

        const result = await moderationService.moderate(
            "s-p-a-m",
        )

        expect(result.approved).toBe(false)
    })
})