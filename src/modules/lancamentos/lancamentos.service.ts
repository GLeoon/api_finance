import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateLancamentoDto } from './dto/create-lancamentos.dto';
import { UpdateLancamentoDto } from './dto/update-lancamentos.dto';

@Injectable()
export class LancamentosService {
  constructor(private readonly prisma: PrismaService) {}

  create(dto: CreateLancamentoDto) {
    return this.prisma.lancamento.create({ data: dto as any });
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
