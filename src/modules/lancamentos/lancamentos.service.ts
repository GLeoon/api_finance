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
    if (dto.alvo === 'FATURA') {
      return this.createLancamentoFatura(dto);
    }

    if (dto.alvo === 'CONTA') {
      return this.createLancamentoConta(dto);
    }

    throw new BadRequestException('Tipo de lançamento inválido');
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

  async createLancamentoFatura(dto: CreateLancamentoDto) {
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
      data: {
        ...dto,
      },
    });

    await this.prisma.fatura.update({
      where: { idFatura: dto.idFatura },
      data: {
        valorTotal: novoValorTotal,
      },
    });

    return lancamento;
  }

  async createLancamentoConta(dto: CreateLancamentoDto) {
    if (!dto.idConta) {
      throw new BadRequestException(
        'idConta é obrigatório para lançamento em conta',
      );
    }

    const conta = await this.prisma.conta.findUnique({
      where: {
        idConta_idUsuario: { idConta: dto.idConta, idUsuario: dto.idUsuario },
      },
    });

    if (!conta) {
      throw new NotFoundException('Conta não encontrada');
    }

    const impacto =
      dto.tipo === 'SAIDA' ? -Math.abs(dto.valor) : Math.abs(dto.valor);

    if (conta.saldo + impacto < 0) {
      throw new BadRequestException('Saldo insuficiente');
    }

    return this.prisma.$transaction(async (tx) => {
      const lancamento = await tx.lancamento.create({
        data: dto,
      });

      await tx.conta.update({
        where: {
          idConta_idUsuario: { idConta: dto.idConta, idUsuario: dto.idUsuario },
        },
        data: {
          saldo: conta.saldo + impacto,
        },
      });

      return lancamento;
    });
  }
}
