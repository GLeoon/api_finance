import { PartialType } from '@nestjs/swagger';
import { CreateUsuarioDto } from './create-usuarios.dto';

export class UpdateUsuarioDto extends PartialType(CreateUsuarioDto) {}
