import { ApiProperty } from '@nestjs/swagger';
import {
  IsDateString,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator';

export class CreateContaDto {
  @ApiProperty()
  @IsNumber()
  idUsuario: number;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsNumber()
  idGrupo?: number;

  @ApiProperty({ example: 'CORRENTE' })
  @IsString()
  tipo: string;

  @ApiProperty({ example: 1000 })
  @IsNumber()
  saldoInicial: number;

  @ApiProperty()
  @IsDateString()
  dataCriacao: Date;
}
