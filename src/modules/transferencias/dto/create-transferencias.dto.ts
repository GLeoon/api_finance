import { ApiProperty } from '@nestjs/swagger';
import { IsDateString, IsInt, IsNumber } from 'class-validator';

export class CreateTransferenciaDto {
  @ApiProperty()
  @IsInt()
  idContaOrigem: number;

  @ApiProperty()
  @IsInt()
  idContaDestino: number;

  @ApiProperty()
  @IsNumber()
  valor: number;

  @ApiProperty()
  @IsDateString()
  dataTransferencia: Date;
}
