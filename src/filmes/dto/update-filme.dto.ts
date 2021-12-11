import { IsString, IsNotEmpty, IsBoolean } from "class-validator";

export class UpdateFilmeDto {

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

export class AssistidoDto {
    
    @IsBoolean()
    assistido: boolean;
   
}
