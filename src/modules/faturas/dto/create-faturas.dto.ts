import { ApiProperty } from '@nestjs/swagger';
import { IsDateString, IsInt, IsNumber, IsString } from 'class-validator';

export class CreateFaturaDto {
  @ApiProperty()
  @IsInt()
  idCartao: number;

  @ApiProperty()
  @IsInt()
  idUsuario: number;

  @ApiProperty()
  @IsInt()
  mesReferencia: number;

  @ApiProperty()
  @IsInt()
  anoReferencia: number;

  @ApiProperty()
  @IsDateString()
  dataFechamento: Date;

  @ApiProperty()
  @IsDateString()
  dataVencimento: Date;

  @ApiProperty()
  @IsNumber()
  valorTotal: number;

  @ApiProperty({ example: 'ABERTA' })
  @IsString()
  statusPagamento: string;
}
