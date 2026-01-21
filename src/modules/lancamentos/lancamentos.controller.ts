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
import { LancamentosService } from './lancamentos.service';
import { CreateLancamentoDto } from './dto/create-lancamentos.dto';
import { UpdateLancamentoDto } from './dto/update-lancamentos.dto';

@ApiTags('Lançamentos')
@Controller('lancamentos')
export class LancamentosController {
  constructor(private readonly service: LancamentosService) {}

  @Post()
  @ApiOperation({ summary: 'Criar lançamento' })
  @ApiBody({ type: CreateLancamentoDto })
  create(@Body() dto: CreateLancamentoDto) {
    return this.service.create(dto);
  }

  @Get()
  @ApiOperation({ summary: 'Listar lançamentos' })
  findAll() {
    return this.service.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Buscar lançamento por ID' })
  @ApiParam({ name: 'id', type: Number })
  findOne(@Param('id') id: string) {
    return this.service.findOne(+id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Atualizar lançamento' })
  @ApiBody({ type: UpdateLancamentoDto })
  update(@Param('id') id: string, @Body() dto: UpdateLancamentoDto) {
    return this.service.update(+id, dto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Remover lançamento' })
  remove(@Param('id') id: string) {
    return this.service.remove(+id);
  }
}
