import { Post } from "@/posts/domain/post.entity"

/**
 * Datos necesarios para crear un Post.
 * No incluye id, createdAt ni updatedAt ya que son generados por la capa de persistencia.
 */
export type CreatePostData = {
    title: string
    description: string
    imageUrl: string
    categoryId?: string
}

/**
 * Tipo que representa un Post con sus relaciones cargadas,
 * usado para construir la vista del feed.
 */
export type PostWithRelations = {
    id: string
    title: string
    description: string
    imageUrl: string
    categoryId: string | null
    createdAt: Date
    updatedAt: Date
    category: { name: string } | null
    comments: Array<{ id: string }>
    likes: Array<{ weight: number }>
}

/**
 * Interfaz del repositorio de Posts.
 * Define el contrato de acceso a datos sin acoplar a ningún ORM.
 */
export interface PostRepository {
    create(data: CreatePostData): Promise<Post>
    findAll(): Promise<Post[]>
    findById(id: string): Promise<Post | null>
    findWithRelations(categoryId?: string): Promise<PostWithRelations[]>
}

export const POST_REPOSITORY = "POST_REPOSITORY"
