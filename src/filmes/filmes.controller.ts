import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { FilmesService } from './filmes.service';
import { CreateFilmeDto } from './dto/create-filme.dto';
import { UpdateFilmeDto, AssistidoDto } from './dto/update-filme.dto';
import { Filme } from '@prisma/client';
import { AuthGuard } from '@nestjs/passport';



@Controller('filme')
export class FilmesController {
  constructor(private readonly filmesService: FilmesService) {}


  @Post('create')
  create(@Body() createFilmeDto: CreateFilmeDto): Promise<Filme> {
    return this.filmesService.create(createFilmeDto);
  }

 
  @Get('get-all')
  findAll(): Promise<Filme[]> {
    return this.filmesService.findAll();
  }

  
  @Get('find-one/:id')
  findOne(@Param('id') id: string): Promise<Filme> {
    return this.filmesService.findOne(id);
  }

  
  @Patch('update/:id')
  update(@Param('id') id: string, @Body() updateFilmeDto: UpdateFilmeDto): Promise<Filme> {
    return this.filmesService.update(id, updateFilmeDto);
  }

  @UseGuards(AuthGuard('jwt'))
  @Delete('delete/:id')
  remove(@Param('id') id: string): Promise<{message: string}> {
    return this.filmesService.remove(id);
  }

  @Patch('updateAssistido/:id')
  updateAssistido(@Param('id') id: string, @Body() assistidoDto: AssistidoDto): Promise<Filme> {
    return this.filmesService.updateAssistido(id, assistidoDto);
  }
}
