import { Module } from "@nestjs/common";
import { PrismaService } from "./prisma.service";

//Modulo Prisma com as declarações e exportações do serviço Prisma.
@Module({
    providers: [PrismaService],
    exports: [PrismaService],
})

export class PrismaModule {}