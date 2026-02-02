import {
  Injectable,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateLancamentoDto } from './dto/create-lancamentos.dto';
import { UpdateLancamentoDto } from './dto/update-lancamentos.dto';

@Injectable()
export class LancamentosService {
  constructor(private readonly prisma: PrismaService) {}

  async create(dto: CreateLancamentoDto) {
    const fatura = await this.prisma.fatura.findUnique({
      where: { idFatura: dto.idFatura },
      include: {
        cartao: true,
      },
    });

    if (!fatura) {
      throw new NotFoundException('Fatura não encontrada');
    }

    const novoValorTotal = fatura.valorTotal + Math.abs(dto.valor);
    if (novoValorTotal > fatura.cartao.limite) {
      throw new BadRequestException(
        `Limite de crédito excedido! Limite: R$ ${fatura.cartao.limite}, Novo total: R$ ${novoValorTotal}`,
      );
    }

    const lancamento = await this.prisma.lancamento.create({
      data: dto as any,
    });

    await this.prisma.fatura.update({
      where: { idFatura: dto.idFatura },
      data: {
        valorTotal: novoValorTotal,
      },
    });

    return lancamento;
  }

  findAll() {
    return this.prisma.lancamento.findMany({
      include: {
        conta: true,
        grupo: true,
        fatura: true,
      },
    });
  }

  async findOne(id: number) {
    const lancamento = await this.prisma.lancamento.findUnique({
      where: { idLancamento: id },
    });

    if (!lancamento) throw new NotFoundException('Lançamento não encontrado');
    return lancamento;
  }

  update(id: number, dto: UpdateLancamentoDto) {
    return this.prisma.lancamento.update({
      where: { idLancamento: id },
      data: dto,
    });
  }

  remove(id: number) {
    return this.prisma.lancamento.delete({
      where: { idLancamento: id },
    });
  }
}
