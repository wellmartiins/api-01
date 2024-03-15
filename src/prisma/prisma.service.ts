import { INestApplication, Injectable, OnModuleInit } from "@nestjs/common";
import { PrismaClient } from "@prisma/client";

//Serviço Prisma responável para conexão(ao iniciar) e logoff(ao finalizar) do banco de dados.
@Injectable()
export class PrismaService extends PrismaClient implements OnModuleInit {
    
    // para conectar ao iniciar.
    async onModuleInit() {
        await this.$connect()
    }

    // para desconectar ao finalizar.
    async enableShutdownHooks(app: INestApplication) {
        process.on('beforeExit' , async () => {
            await app.close();
        })
    }
}