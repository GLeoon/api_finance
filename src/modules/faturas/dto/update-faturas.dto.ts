import { PartialType } from '@nestjs/swagger';
import { CreateFaturaDto } from './create-faturas.dto';

export class UpdateFaturaDto extends PartialType(CreateFaturaDto) {}
