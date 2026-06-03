import { Injectable } from '@nestjs/common';
import { PrismaService } from '@/shared/prisma.service';
import { LikeRepository } from '../domain/like.repository';
import { Like } from '../domain/like.entity';

@Injectable()
export class PrismaLikeRepository implements LikeRepository {
    constructor(private readonly prisma: PrismaService) {}

    async create(data: Omit<Like, 'id' | 'createdAt'>): Promise<Like> {
        return this.prisma.like.create({
            data,
        });
    }
}