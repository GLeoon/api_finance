import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateCartaoDto } from './dto/create-cartoes-credito.dto';
import { UpdateCartaoDto } from './dto/update-cartoes-credito.dto';

@Injectable()
export class CartoesCreditoService {
  constructor(private readonly prisma: PrismaService) {}

  create(dto: CreateCartaoDto) {
    const now = new Date();
    const validadeDate = new Date(
      now.getFullYear() + 5,
      now.getMonth(),
      now.getDate(),
    );
    const validadeMes = validadeDate.getMonth() + 1;
    const validadeAno = validadeDate.getFullYear();

    return this.prisma.cartaoCredito.create({
      data: {
        ...dto,
        bandeira: 'MasterCard',
        validadeMes,
        validadeAno,
        limite: 10000.0,
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
      include: { usuario: true },
    });

    if (!cartao) throw new NotFoundException('Cartão não encontrado');
    return cartao;
  }

  update(id: number, idUsuario: number, dto: UpdateCartaoDto) {
    console.log('Updating card with id:', id, 'for user:', idUsuario);
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
