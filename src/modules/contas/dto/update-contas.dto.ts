import { PartialType } from '@nestjs/swagger';
import { CreateContaDto } from './create-contas.dto';

export class UpdateContaDto extends PartialType(CreateContaDto) {}
