import { Injectable, ConflictException, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { User } from '@prisma/client';
import { PrismaService } from 'src/prisma.service';
import * as bcrypt from 'bcrypt';
import { UpdateUserDto } from './dto/update-user.dto';
import { CreateUserDto } from './dto/create-user.dto';


@Injectable()
export class UserService {
    constructor(private banco: PrismaService) {}

    async create(dados: CreateUserDto): Promise<User> {
        if(dados.senha !== dados.confirmacaoSenha ) {
            throw new UnauthorizedException('Senhas nao conferem');
        }

        const userExists = await this.banco.user.findUnique({
            where: {email: dados.email},
        });
        if(userExists){
            throw new ConflictException('Email já está cadastrado');
        }

        const salt = 10;
        const hashedPassword = await bcrypt.hash(dados.senha, salt);

        const user = await this.banco.user.create({
            data: {
                ...dados,
                senha: hashedPassword,
            },
        });
        delete user.senha;
        return user;
    }
    async update(id: string, dados: UpdateUserDto): Promise<User> {
        const user = await this.banco.user.update({
          data: dados,
          where: { id: id }, 
        });

        delete user.senha;
        return user;
        
    }

    async findMany(): Promise<any[]>{
        const user = await this.banco.user.findMany();
        const userNoPass = user.map(({senha, ...resto}) => resto);
        return userNoPass;
    }

    async findUnique(id: string): Promise<User>{
        const user = await this.banco.user.findUnique({
            where: { id },
        });

        if(!user){
            throw new NotFoundException('Usuario com o Id Informado não foi encontrado');
        };
        delete user.senha;
        return user;
    }

    async delete(id: string): Promise<{message: string}> {
        const user = await this.banco.user.findUnique({
            where: { id },
        });
        if(!user){
            throw new NotFoundException(' usuario com o ID não foi encontrado')
        }else{
            await this.banco.user.delete({
                where: { id },
            });
        }
        return { message: 'Id foi encontrado e deletado com sucesso',}
    };

   async addList(user: User, filmeid: string) {
        const filme = await this.banco.filme.findUnique({
            where: { id: filmeid },
        })

        if(!filme){
            throw new NotFoundException('Filme nao encontrado');
        }
        const usuario = await this.banco.user.update({
            where: { id: user.id },
            data: {
              movie: {
                  connect: {
                      id: filme.id,
                  },
              },  
            },
            include: {
                movie: true,
            },
        });
        delete usuario.senha;
        return usuario;
    }

}
