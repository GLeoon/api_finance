import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateTransferenciaDto } from './dto/create-transferencias.dto';

@Injectable()
export class TransferenciasService {
  constructor(private readonly prisma: PrismaService) {}

  async create(dto: CreateTransferenciaDto) {
    return this.prisma.$transaction(async (tx) => {
      const lancamentoOrigem = await tx.lancamento.create({
        data: {
          idConta: dto.idContaOrigem,
          valor: dto.valor,
          tipo: 'SAIDA',
          dataLancamento: dto.dataTransferencia,
        } as any,
      });

      const lancamentoDestino = await tx.lancamento.create({
        data: {
          idConta: dto.idContaDestino,
          valor: dto.valor,
          tipo: 'ENTRADA',
          dataLancamento: dto.dataTransferencia,
        } as any,
      });

      return tx.transferencia.create({
        data: {
          idContaOrigem: dto.idContaOrigem,
          idContaDestino: dto.idContaDestino,
          valor: dto.valor,
          dataTransferencia: dto.dataTransferencia,
          idLancamentoOrigem: lancamentoOrigem.idLancamento,
          idLancamentoDestino: lancamentoDestino.idLancamento,
        } as any,
      });
    });
  }

  findAll() {
    return this.prisma.transferencia.findMany();
  }

  async findOne(id: number) {
    const transferencia = await this.prisma.transferencia.findUnique({
      where: { idTransferencia: id },
    });

    if (!transferencia)
      throw new NotFoundException('Transferência não encontrada');

    return transferencia;
  }

  remove(id: number) {
    return this.prisma.transferencia.delete({
      where: { idTransferencia: id },
    });
  }
}
