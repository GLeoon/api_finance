import { ApiProperty } from '@nestjs/swagger';
import {
  IsInt,
  IsNotEmpty,
  IsNumber,
  IsString,
  Max,
  Min,
} from 'class-validator';

export class CreateCartaoDto {
  @ApiProperty()
  @IsNumber()
  idUsuario: number;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  nome: string;

  @ApiProperty()
  @IsNumber()
  limite: number;

  @ApiProperty({ example: 'VISA' })
  @IsString()
  bandeira: string;

  @ApiProperty()
  @IsInt()
  @Min(1)
  @Max(12)
  validadeMes: number;

  @ApiProperty()
  @IsInt()
  validadeAno: number;
}
