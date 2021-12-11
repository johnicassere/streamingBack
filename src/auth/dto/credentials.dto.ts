import { IsString, IsEmail, IsNotEmpty, Length } from "class-validator";

export class CrendentialsDto {
    
    @IsString()
    @IsEmail()
    @IsNotEmpty()
    email: string;

    @IsString()
    @IsEmail()
    @Length(6, 5)
    senha: string;
}