import { Controller, Body, Post, Get, Param, Delete, Patch, UseGuards } from '@nestjs/common';
import { User } from '@prisma/client';
import { CreateUserDto } from './dto/create-user.dto';
import { UserService } from './user.service';
import { UpdateUserDto } from '../user/dto/update-user.dto';
import { AuthGuard } from '@nestjs/passport';
import AuthUser from 'src/auth/auth-user.decorator';


@Controller('user')
export class UserController {
    constructor(private service: UserService) {}

    @Post('create')
    create(@Body() data: CreateUserDto): Promise<User> {
        return this.service.create(data);
    }
    @Patch('update/:id')
    update(@Param('id') id: string, @Body() data: UpdateUserDto): Promise<User>{
       return this.service.update(id, data);
    }
    @Get('findMany')
    findMany(): Promise<any[]>{
        return this.service.findMany();
    }
    @Get('findUnique/:id')
    findUnique(@Param('id') id: string): Promise<User>{
        return this.service.findUnique(id);
    }
    @UseGuards(AuthGuard('jwt'))
    @Delete('delete/:id')
    delete(@Param('id') id: string): Promise<{message: string}>{
        return this.service.delete(id);
    }

    @Patch('addList/:id')
    addList(@AuthUser() user: User, @Param('id') filmeid: string){
        return this.service.addList(user, filmeid);
    }
}
