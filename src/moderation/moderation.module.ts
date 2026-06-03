import { Module } from "@nestjs/common"
import { ModerationController } from "./moderation.controller"
import { ModerationService } from "./moderation.service"
import { MODERATION_REPOSITORY } from "./domain/moderation.repository"
import { PrismaModerationRepository } from "./infrastructure/prisma-moderation.repository"
import { PrismaModule } from "@/shared/prisma.module"

@Module({
    imports: [PrismaModule],
    controllers: [ModerationController],
    providers: [
        ModerationService,
        {
            provide: MODERATION_REPOSITORY,
            useClass: PrismaModerationRepository,
        },
    ],
    exports: [ModerationService], // Permite que CommentsModule use este servicio
})
export class ModerationModule {}