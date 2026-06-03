import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '@/shared/prisma.service';
import { ModerationRepository } from '../domain/moderation.repository';
import { ProhibitedWord } from '../domain/prohibited-word.entity';

@Injectable()
export class PrismaModerationRepository implements ModerationRepository {
    constructor(private readonly prisma: PrismaService) {}

    async findAll(): Promise<ProhibitedWord[]> {
        return this.prisma.prohibitedWord.findMany({
            orderBy: { createdAt: "desc" },
        });
    }

    async create(data: { word: string; category: string }): Promise<ProhibitedWord> {
        return this.prisma.prohibitedWord.create({
            data,
        });
    }

    async delete(id: string): Promise<ProhibitedWord> {
        try {
            return await this.prisma.prohibitedWord.delete({ where: { id } });
        } catch (err: unknown) {
            if (
                err instanceof Error &&
                "code" in err &&
                (err as { code: string }).code === "P2025"
            ) {
                throw new NotFoundException("Palabra prohibida no encontrada");
            }
            throw err;
        }
    }
}