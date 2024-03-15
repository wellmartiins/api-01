import { PrismaService } from 'src/prisma/prisma.service';
import { CreateUserDTO } from './dto/create-user.dto';
import { Injectable, NotFoundException } from "@nestjs/common";
import { UpdatePatchUserDTO } from './dto/update-patch-user.dto';
import { UpdatePutUserDTO } from './dto/update-put-user.dto';

//Servico responsável para criação do usuário
@Injectable()
export class UserService{

    constructor(
        private prisma: PrismaService
    ) {}

    // servico post para criar os user no banco
    async create({email,name,password}: CreateUserDTO){

        return this.prisma.user.create({
            data: {
                name,
                email,
                password
            }
        })
    }

    // servico get para pegar todos os users
    async list () {

        return  this.prisma.user.findMany()

    }

    //servico get para trazer um usuario especifico
    async show(id: number) {
        
        await this.idExists(id)

        return this.prisma.user.findUnique({
            where: {
                id,
            }
        })
    }

    // servico put para atualizar um usuario especifico
    async update(id: number, data: UpdatePutUserDTO) {

        await this.idExists(id)

        return this.prisma.user.update({
            data,
            where: {
                id,
            }
        })
    }

    // servico patch para atualizar parcialmente os dados de um usuario especifico 
    async updatePartial(id: number, data: UpdatePatchUserDTO) {

        await this.idExists(id)

        if (data.email) {
            data.email = data.email
        }

        if (data.name) {
            data.name = data.name
        }

        if (data.password) {
            data.password = data.password
        }

        return this.prisma.user.update({
            data,
            where: {
                id
            }
        })
    }

    // servico delete para excluir um usuario especifico
    async delete(id: number) {

        await this.idExists(id)

        return this.prisma.user.delete({
            where: {
                id,
            }
        })
    }

    // funcao para verificar se o ID existe
    async idExists(id: number) {
        if (!(await this.prisma.user.count({
            where: {
                id
            }
        }))) {
            throw new NotFoundException(`O usuário ${id} não existe`)
        }   
    }
}