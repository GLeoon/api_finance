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
import { FaturasService } from './faturas.service';
import { CreateFaturaDto } from './dto/create-faturas.dto';
import { UpdateFaturaDto } from './dto/update-faturas.dto';

@ApiTags('Faturas')
@Controller('faturas')
export class FaturasController {
  constructor(private readonly service: FaturasService) {}

  @Post()
  @ApiOperation({ summary: 'Criar fatura' })
  @ApiBody({ type: CreateFaturaDto })
  create(@Body() dto: CreateFaturaDto) {
    return this.service.create(dto);
  }

  @Get()
  @ApiOperation({ summary: 'Listar faturas' })
  findAll() {
    return this.service.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Buscar fatura por ID' })
  @ApiParam({ name: 'id', type: Number })
  findOne(@Param('id') id: string) {
    return this.service.findOne(+id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Atualizar fatura' })
  @ApiBody({ type: UpdateFaturaDto })
  update(@Param('id') id: string, @Body() dto: UpdateFaturaDto) {
    return this.service.update(+id, dto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Remover fatura' })
  remove(@Param('id') id: string) {
    return this.service.remove(+id);
  }
}
