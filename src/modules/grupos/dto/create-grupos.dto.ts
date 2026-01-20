import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class CreateGrupoDto {
  @ApiProperty({ example: 'Alimentação' })
  @IsString()
  @IsNotEmpty()
  nome: string;

  @ApiProperty({ example: 'Gastos com comida' })
  @IsString()
  @IsNotEmpty()
  descricao: string;
}
