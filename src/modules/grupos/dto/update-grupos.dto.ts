import { PartialType } from '@nestjs/swagger';
import { CreateGrupoDto } from './create-grupos.dto';

export class UpdateGrupoDto extends PartialType(CreateGrupoDto) {}
