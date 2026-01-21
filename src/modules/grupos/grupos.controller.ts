import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import {
  ApiBody,
  ApiOperation,
  ApiParam,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { GruposService } from './grupos.service';
import { CreateGrupoDto } from './dto/create-grupos.dto';
import { UpdateGrupoDto } from './dto/update-grupos.dto';

@ApiTags('Grupos')
@Controller('grupos')
export class GruposController {
  constructor(private readonly service: GruposService) {}

  @Post()
  @ApiOperation({ summary: 'Criar grupo' })
  @ApiBody({ type: CreateGrupoDto })
  create(@Body() dto: CreateGrupoDto) {
    return this.service.create(dto);
  }

  @Get()
  @ApiOperation({ summary: 'Listar grupos' })
  findAll() {
    return this.service.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Buscar grupo por ID' })
  @ApiParam({ name: 'id', type: Number })
  findOne(@Param('id') id: string) {
    return this.service.findOne(+id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Atualizar grupo' })
  @ApiParam({ name: 'id', type: Number })
  @ApiBody({ type: UpdateGrupoDto })
  update(@Param('id') id: string, @Body() dto: UpdateGrupoDto) {
    return this.service.update(+id, dto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Remover grupo' })
  @ApiParam({ name: 'id', type: Number })
  remove(@Param('id') id: string) {
    return this.service.remove(+id);
  }
}
