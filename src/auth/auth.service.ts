import { BadRequestException, Injectable, UnauthorizedException } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { Prisma, User } from "@prisma/client";
import { PrismaService } from "src/prisma/prisma.service";
import { AuthRegisterDTO } from "./dto/auth-register.dto";
import { UserService } from "src/user/user.service";
import { MailerService } from "@nestjs-modules/mailer";

@Injectable()
export class AuthService {

    constructor(
        private readonly jwtService: JwtService,
        private readonly prisma: PrismaService,
        private readonly userService: UserService,
        private readonly mailer: MailerService,
        
        ) {}

    async createToken(user:User){
        return {
            accessToken: this.jwtService.sign({
                id: user.id,
                name: user.name,
                email: user.email
            }, {
                expiresIn: "7 days",
                subject: String(user.id),
                issuer: 'login',
                audience: 'users'
            })
        };
    };

    async checkToken(token: string){

        try{
        const data = await this.jwtService.verify(token, {
            audience: 'users',
            issuer: 'login',
        });
        } catch(e) {
            throw new BadRequestException(e);
        }
    }

    async login(email: string, password: string){

        const user = await this.prisma.user.findFirst({
            where: {
                email,
                password
            }
        });
        if (!user) {
            throw new UnauthorizedException('E-mail e/ou Senha incorretos.')
        }
        return this.createToken(user);
    }


    async forget(email: string){

        const user = await this.prisma.user.findFirst({
            where: {
                email
            }
        });
        if (!user) {
            throw new UnauthorizedException('E-mail está incorretos.')
        }

        await this.mailer.sendMail({
            subject: "Recuperacao de senha",
            to: "may.luce@hotmail.com",
            template:"forget",
        })
        
        return true;

    }


    async reset(password: string, token: string){

        //TO DO: Validar o token...

        const id = 0;

        const user = await this.prisma.user.update({
            where: {
                id,
            },
            data: {
                password,
            }
        })

        return this.createToken(user);

    }

    async register(data: AuthRegisterDTO) {
        const user = await this.userService.create(data);
        return this.createToken(user);
    }



}