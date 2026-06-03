import { Inject, Injectable } from "@nestjs/common"
import { ModerationRepository, MODERATION_REPOSITORY } from "./domain/moderation.repository"

export type ModerationResult = {
    approved: boolean
    reason?: string
    category?: string
}

const buildFuzzyRegex = (word: string) => {
    const escaped = word.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")
    return new RegExp(escaped.split("").join("[^a-zA-Z0-9]*"), "gi")
}

@Injectable()
export class ModerationService {
    constructor(
        @Inject(MODERATION_REPOSITORY)
        private readonly moderationRepository: ModerationRepository,
    ) {}

    async moderate(text: string): Promise<ModerationResult> {
        const words = await this.moderationRepository.findAll()

        for (const pw of words) {
            const regex = buildFuzzyRegex(pw.word)
            if (regex.test(text)) {
                return {
                    approved: false,
                    reason: `Contiene palabra prohibida: "${pw.word}"`,
                    category: pw.category,
                }
            }
        }

        return { approved: true }
    }

    findAll() {
        return this.moderationRepository.findAll()
    }

    create(word: string, category: string) {
        return this.moderationRepository.create({ word, category })
    }

    async delete(id: string) {
        return this.moderationRepository.delete(id)
    }
}