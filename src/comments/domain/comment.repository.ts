import { Comment } from './comment.entity';

export const COMMENT_REPOSITORY = Symbol('COMMENT_REPOSITORY');

export interface CommentRepository {
    findByPostId(postId: string): Promise<Comment[]>;
    create(data: Omit<Comment, 'id' | 'createdAt' | 'updatedAt'>): Promise<Comment>;
}