import { Module } from "@nestjs/common";
import { JwtModule } from "@nestjs/jwt";
import { AuthController } from "./auth.controller";
import { UserModule } from "src/user/user.module";
import { PrismaModule } from "src/prisma/prisma.module";
import { AuthService } from "./auth.service";
import { FileModule } from "src/file/file.module";


@Module({
    imports: [
        JwtModule.register({
        secret: "Ui54uR^kY=irW0~>@UdorkBK5=Td}FGGpGy"
        }),
        UserModule,
        PrismaModule,
        FileModule,
    ],

    controllers: [AuthController],
    providers: [AuthService],
})
export class AuthModule {

}