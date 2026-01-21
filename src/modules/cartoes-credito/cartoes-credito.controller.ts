import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import {
  ApiBody,
  ApiOperation,
  ApiParam,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { CartoesCreditoService } from './cartoes-credito.service';
import { CreateCartaoDto } from './dto/create-cartoes-credito.dto';
import { UpdateCartaoDto } from './dto/update-cartoes-credito.dto';

@ApiTags('Cartões de Crédito')
@Controller('cartoes-credito')
export class CartoesCreditoController {
  constructor(private readonly service: CartoesCreditoService) {}

  @Post()
  @ApiOperation({ summary: 'Criar cartão de crédito' })
  @ApiBody({ type: CreateCartaoDto })
  create(@Body() dto: CreateCartaoDto) {
    return this.service.create(dto);
  }

  @Get()
  @ApiOperation({ summary: 'Listar cartões de crédito' })
  findAll() {
    return this.service.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Buscar cartão por ID' })
  @ApiParam({ name: 'id', type: Number })
  findOne(@Param('id') id: string) {
    return this.service.findOne(+id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Atualizar cartão' })
  @ApiBody({ type: UpdateCartaoDto })
  @UsePipes(
    new ValidationPipe({
      transform: true,
    }),
  )
  update(@Param('id') id: string, @Body() dto: UpdateCartaoDto) {
    if (typeof dto.idUsuario !== 'number') {
      throw new Error('idUsuario is required and must be a number');
    }
    return this.service.update(+id, dto.idUsuario, dto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Remover cartão' })
  remove(@Param('id') id: string, @Body() dto: UpdateCartaoDto) {
    if (typeof dto.idUsuario !== 'number') {
      throw new Error('idUsuario is required and must be a number');
    }
    return this.service.remove(+id, dto.idUsuario);
  }
}
