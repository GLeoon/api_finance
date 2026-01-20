import { PartialType } from '@nestjs/swagger';
import { CreateTransferenciaDto } from './create-transferencias.dto';

export class UpdateTransferenciaDto extends PartialType(
  CreateTransferenciaDto,
) {}
