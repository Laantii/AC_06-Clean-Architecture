import { Injectable } from '@nestjs/common';
import { PrismaService } from '@/shared/prisma.service';
import { CommentRepository } from '../domain/comment.repository';
import { Comment } from '../domain/comment.entity';

@Injectable()
export class PrismaCommentRepository implements CommentRepository {
    constructor(private readonly prisma: PrismaService) {}

    async findByPostId(postId: string): Promise<Comment[]> {
        return this.prisma.comment.findMany({
            where: { postId },
            orderBy: { createdAt: "desc" },
        });
    }

    async create(data: Omit<Comment, 'id' | 'createdAt' | 'updatedAt'>): Promise<Comment> {
        return this.prisma.comment.create({
            data,
        });
    }
}