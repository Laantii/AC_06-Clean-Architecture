export interface PostProps {
    id: string
    title: string
    description: string
    imageUrl: string
    categoryId: string | null
    createdAt: Date
    updatedAt: Date
}

export class Post {
    readonly id: string
    readonly title: string
    readonly description: string
    readonly imageUrl: string
    readonly categoryId: string | null
    readonly createdAt: Date
    readonly updatedAt: Date

    constructor(props: PostProps) {
        this.id = props.id
        this.title = props.title
        this.description = props.description
        this.imageUrl = props.imageUrl
        this.categoryId = props.categoryId
        this.createdAt = props.createdAt
        this.updatedAt = props.updatedAt
    }

    /**
     * Concatena título y descripción para moderación de contenido.
     */
    getFullText(): string {
        return `${this.title} ${this.description}`
    }
}
