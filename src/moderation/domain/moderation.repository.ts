import { ProhibitedWord } from './prohibited-word.entity';

export const MODERATION_REPOSITORY = Symbol('MODERATION_REPOSITORY');

export interface ModerationRepository {
    findAll(): Promise<ProhibitedWord[]>;
    create(data: { word: string; category: string }): Promise<ProhibitedWord>;
    delete(id: string): Promise<ProhibitedWord>;
}