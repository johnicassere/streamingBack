import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateFilmeDto } from './dto/create-filme.dto';
import { UpdateFilmeDto, AssistidoDto } from './dto/update-filme.dto';
import { PrismaService } from 'src/prisma.service';
import { Filme } from '@prisma/client';



@Injectable()
export class FilmesService {
  constructor(private database: PrismaService) {}

 async create(dadosFilme: CreateFilmeDto): Promise<Filme> {
   const filmeExiste = await this.database.filme.findUnique({
     where: { nomeFilme: dadosFilme.nomeFilme },
   });

   if(filmeExiste){
    throw new ConflictException('Esse filme ja existe');
   }

   const filme = await this.database.filme.create({ data: dadosFilme });
   return filme;
 }

 async findAll(): Promise<Filme[]> {
   const filmes = await this.database.filme.findMany();
   return filmes;
 }
 
 async findOne(id: string): Promise<Filme> {
   const filmeExiste = await this.database.filme.findUnique({
     where: { id },
   });
   if(!filmeExiste){
    throw new NotFoundException('Filme com id informado nao foi encontrado');
   }
   return filmeExiste;
 }
 async update(id: string, updateFilmesDto: UpdateFilmeDto): Promise<Filme> {
   const filme = await this.database.filme.update({
     data: updateFilmesDto,
     where: { id },
   });
   return filme;
 }
 
 async remove(id: string): Promise<{ message: string }> {
   const filmeExiste = await this.database.filme.findUnique({
     where: { id },
   });
   if(!filmeExiste){
    throw new NotFoundException('Filme com ID informado nao encontrado');
   }else{
     await this.database.filme.delete({
       where: { id },
     });
   }

   return { message: 'Id foi encontrado e deletado'};
 }
 async updateAssistido (id: string, AssistidoDto: AssistidoDto): Promise<Filme> {
  const filme = await this.database.filme.update({
    data: AssistidoDto,
    where: { id },
  });
    return filme;
    
} 
}
