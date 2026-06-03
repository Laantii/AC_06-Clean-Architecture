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
