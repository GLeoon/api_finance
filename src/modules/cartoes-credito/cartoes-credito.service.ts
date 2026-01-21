import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateCartaoDto } from './dto/create-cartoes-credito.dto';
import { UpdateCartaoDto } from './dto/update-cartoes-credito.dto';

@Injectable()
export class CartoesCreditoService {
  constructor(private readonly prisma: PrismaService) {}

  create(dto: CreateCartaoDto) {
    return this.prisma.cartaoCredito.create({
      data: {
        ...dto,
      } as any,
    });
  }

  findAll() {
    return this.prisma.cartaoCredito.findMany({
      include: { usuario: true },
    });
  }

  async findOne(id: number) {
    const cartao = await this.prisma.cartaoCredito.findFirst({
      where: { idCartao: id },
    });

    if (!cartao) throw new NotFoundException('Cartão não encontrado');
    return cartao;
  }

  update(id: number, idUsuario: number, dto: UpdateCartaoDto) {
    return this.prisma.cartaoCredito.update({
      where: { idCartao_idUsuario: { idCartao: id, idUsuario } },
      data: { ...dto },
    });
  }

  remove(id: number, idUsuario: number) {
    return this.prisma.cartaoCredito.delete({
      where: { idCartao_idUsuario: { idCartao: id, idUsuario } },
    });
  }
}
