import { PartialType } from '@nestjs/swagger';
import { CreateCartaoDto } from './create-cartoes-credito.dto';

export class UpdateCartaoDto extends PartialType(CreateCartaoDto) {}
