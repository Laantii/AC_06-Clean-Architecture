import { Like } from './like.entity';

export const LIKE_REPOSITORY = Symbol('LIKE_REPOSITORY');

export interface LikeRepository {
    create(data: Omit<Like, 'id' | 'createdAt'>): Promise<Like>;
}