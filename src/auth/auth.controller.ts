import { BadRequestException, Body, Controller, Post, UploadedFile, UseInterceptors } from "@nestjs/common";
import { AuthLoginDTO } from "./dto/auth-login.dto";
import { AuthRegisterDTO } from "./dto/auth-register.dto";
import { AuthForgetDTO } from "./dto/auth-foget.dto";
import { AuthResetDTO } from "./dto/auth-reset.dto";
import { UserService } from "src/user/user.service";
import { AuthService } from "./auth.service";
import { FileInterceptor } from "@nestjs/platform-express";
import { writeFile } from "fs/promises";
import { join } from "path";
import { FileService } from "src/file/file.service";

@Controller('auth')
export class AuthController {

    constructor(
        private readonly userService: UserService,
        private readonly authService: AuthService,
        private readonly fileService: FileService
        
        ){}

    @Post('login')
    async login(@Body() {email, password}: AuthLoginDTO){
        return this.authService.login(email, password)
    }

    @Post('register')
    async resgiter(@Body() body: AuthRegisterDTO){

        return this.authService.register(body);

    }
    
    @Post('forget')
    async forget(@Body() {email}: AuthForgetDTO){
        return this.authService.forget(email)
    }
    
    @Post('reset')
    async reset(@Body() {password, token}: AuthResetDTO){
        return this.authService.reset(password, token)
    }

    @Post('me')
    async me(@Body() body){
        return this.authService.checkToken(body.token);
    }
    
    //Para fazer upload de arquivos
    @UseInterceptors(FileInterceptor('file'))
    @Post('photo')
    async uploadPhoto(@Body() Body, @UploadedFile() photo: Express.Multer.File){
        
        const path = join(__dirname, '..', '..', 'storage', 'photos', `photo-${'id'}.png`);
        try {
        await this.fileService.upload(photo, path)
    } catch(e) {
        throw new BadRequestException(e);
    }
        return {success: true}
    }
    


}