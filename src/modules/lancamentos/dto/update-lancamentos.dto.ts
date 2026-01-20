import { PartialType } from '@nestjs/swagger';
import { CreateLancamentoDto } from './create-lancamentos.dto';

export class UpdateLancamentoDto extends PartialType(CreateLancamentoDto) {}
