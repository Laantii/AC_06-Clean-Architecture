Edgar Melgarejo: Refactorización de los módulos Posts y Categories. Diseño e implementación de las Entidades de Dominio y aplicación del Patrón Repositorio para abstraer la infraestructura de datos (Prisma).

    1. Problemas Identificados
    Acoplamiento a la base de datos (Falta de Inversión de Dependencias): Se identificó que servicios clave como PostsService y CategoriesService tenían inyectado directamente el PrismaService. Esto violaba Clean Architecture, ya que la lógica de aplicación dependía de detalles de infraestructura (el ORM).

    Ausencia de Capa de Dominio (Anemic Domain): El sistema no contaba con Entidades de Dominio. Los servicios operaban directamente con los tipos de datos crudos generados por Prisma, dejando las reglas de negocio sin encapsular.

    2. Solución Implementada
    Implementación del Patrón Repositorio: Para aislar la base de datos, se crearon las interfaces PostRepository y CategoryRepository en la capa de dominio. Luego, en la capa de infraestructura, se implementaron PrismaPostRepository y PrismaCategoryRepository. Los servicios ahora dependen de las interfaces mediante Tokens de inyección, respetando el Principio de Inversión de Dependencias (DIP).

    Creación de Entidades de Dominio: Se construyeron clases puras (Post y Category) independientes del framework web (NestJS) y del ORM (Prisma), asegurando que el núcleo del negocio esté completamente aislado.

    3. Código Resumido

    // Evidencia de Inversión de Dependencias en PostsService
    @Injectable()
    export class PostsService {
    constructor(
    // El servicio ya no conoce a Prisma, solo a la interfaz de Dominio
    @Inject(POST_REPOSITORY_TOKEN)
    private readonly postRepo: PostRepository,
    private readonly moderationService: ModerationService,
    ) {}
    // ...
    }


Rodrigo Reyes: Refactorización: Módulos de Comentarios, Likes y Moderación
Problemas identificados
Falta de cohesión (DTOs mal ubicados): Los objetos de transferencia de datos (DTOs) para la creación de comentarios y likes estaban centralizados erróneamente en el módulo de Posts, lo que generaba un acoplamiento innecesario y rompía la cohesión de los módulos.

Violación de la Inversión de Dependencias: Los casos de uso (CommentsService, LikesService y ModerationService) dependían directamente del ORM (PrismaService). Esto ataba la lógica de negocio a los detalles de infraestructura de la base de datos, impidiendo cumplir con las capas de Clean Architecture.

Cómo lo solucionamos
Para aislar la lógica de negocio y mejorar la estructura, se implementó el Patrón Repositorio y se reorganizaron los módulos aplicando los siguientes pasos:

Aislamiento de DTOs: - Se extrajeron CreateCommentDto y AddLikeDto del archivo posts.dtos.ts.

Se crearon archivos dedicados (comments.dtos.ts y likes.dtos.ts) dentro de sus respectivos módulos, actualizando las importaciones en los controladores y servicios correspondientes.

Creación de la Capa de Dominio:

Se definieron las Entidades de Dominio puras (Comment, Like y ProhibitedWord) que modelan los datos independientemente del esquema de base de datos.

Se crearon las Interfaces de Repositorio (CommentRepository, LikeRepository, ModerationRepository) para establecer los contratos de persistencia que la aplicación necesita.

Creación de la Capa de Infraestructura:

Se implementaron clases adaptadoras específicas (PrismaCommentRepository, PrismaLikeRepository, PrismaModerationRepository) que cumplen con las interfaces del dominio encapsulando todas las consultas directas a Prisma.

Desacoplamiento de la Capa de Aplicación (Servicios):

Se eliminó la inyección de PrismaService en los tres servicios principales.

En su lugar, se inyectaron las interfaces de dominio mediante tokens (COMMENT_REPOSITORY, LIKE_REPOSITORY, MODERATION_REPOSITORY), delegando el control de errores de base de datos a la infraestructura.

Resolución de Dependencias:

Se actualizaron comments.module.ts, likes.module.ts y moderation.module.ts para conectar los tokens de dominio con las implementaciones de Prisma utilizando useClass, y exportando los servicios necesarios para que interactúen entre sí de forma limpia.
