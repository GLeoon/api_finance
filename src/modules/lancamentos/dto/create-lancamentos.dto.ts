import { ApiProperty } from '@nestjs/swagger';
import {
  IsDateString,
  IsInt,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator';

export class CreateLancamentoDto {
  @ApiProperty()
  @IsInt()
  idConta: number;

  @ApiProperty()
  @IsInt()
  idUsuario: number;

  @ApiProperty()
  @IsInt()
  idGrupo: number;

  @ApiProperty()
  @IsInt()
  idFatura: number;

  @ApiProperty()
  @IsNumber()
  valor: number;

  @ApiProperty({ example: 'DESPESA' })
  @IsString()
  tipo: string;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  descricao?: string;

  @ApiProperty()
  @IsDateString()
  dataLancamento: Date;
}
