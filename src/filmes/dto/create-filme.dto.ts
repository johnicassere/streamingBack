import { IsString,IsNotEmpty } from "class-validator";

export class CreateFilmeDto {

    @IsString()
    @IsNotEmpty()
    nomeFilme: string;

    @IsString()
    @IsNotEmpty()
    generoFilme: string;

    @IsString()
    @IsNotEmpty()
    lancamento: string;

    @IsString()
    @IsNotEmpty()
    linkImagem: string;
}
