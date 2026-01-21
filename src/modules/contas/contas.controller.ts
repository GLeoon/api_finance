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
import { ContasService } from './contas.service';
import { CreateContaDto } from './dto/create-contas.dto';
import { UpdateContaDto } from './dto/update-contas.dto';

@ApiTags('Contas')
@Controller('contas')
export class ContasController {
  constructor(private readonly service: ContasService) {}

  @Post()
  @ApiOperation({ summary: 'Criar conta' })
  @ApiBody({ type: CreateContaDto })
  create(@Body() dto: CreateContaDto) {
    return this.service.create(dto);
  }

  @Get()
  @ApiOperation({ summary: 'Listar contas' })
  findAll() {
    return this.service.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Buscar conta por ID' })
  @ApiParam({ name: 'id', type: Number })
  findOne(@Param('id') id: string) {
    return this.service.findOne(+id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Atualizar conta' })
  @ApiBody({ type: UpdateContaDto })
  update(@Param('id') id: string, @Body() dto: UpdateContaDto) {
    if (dto.idUsuario === undefined) {
      throw new Error('idUsuario is required');
    }
    return this.service.update(
      +id,
      dto as UpdateContaDto & { idUsuario: number },
    );
  }

  @Delete(':id/:idUsuario')
  @ApiOperation({ summary: 'Remover conta' })
  @ApiParam({ name: 'idUsuario', type: Number })
  remove(@Param('id') id: string, @Param('idUsuario') idUsuario: string) {
    return this.service.remove(+id, +idUsuario);
  }
}
