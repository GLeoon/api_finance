import {
  Injectable,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { LancamentosService } from '../lancamentos/lancamentos.service';
import { CreateTransferenciaDto } from './dto/create-transferencias.dto';

@Injectable()
export class TransferenciasService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly lancamentosService: LancamentosService,
  ) {}

  async create(dto: CreateTransferenciaDto) {
    const contaOrigem = await this.prisma.conta.findFirst({
      where: { idConta: dto.idContaOrigem },
    });

    if (!contaOrigem) {
      throw new NotFoundException('Conta de origem não encontrada');
    }

    if (contaOrigem.saldo < dto.valor) {
      throw new BadRequestException(
        `Saldo insuficiente! Saldo disponível: R$ ${contaOrigem.saldo}, Valor da transferência: R$ ${dto.valor}`,
      );
    }

    const contaDestino = await this.prisma.conta.findFirst({
      where: { idConta: dto.idContaDestino },
    });

    if (!contaDestino) {
      throw new NotFoundException('Conta de destino não encontrada');
    }

    // Criar lançamento de saída usando o serviço de lançamentos
    const lancamentoOrigem = await this.lancamentosService.create({
      idConta: dto.idContaOrigem,
      idUsuario: contaOrigem.idUsuario,
      idGrupo: contaOrigem.idGrupo,
      idFatura: null,
      valor: -dto.valor,
      tipo: 'SAIDA',
      descricao: `Transferência para conta ${dto.idContaDestino}`,
      dataLancamento: new Date(),
      alvo: 'CONTA',
    } as any);

    // Criar lançamento de entrada usando o serviço de lançamentos
    const lancamentoDestino = await this.lancamentosService.create({
      idConta: dto.idContaDestino,
      idUsuario: contaDestino.idUsuario,
      idGrupo: contaDestino.idGrupo,
      idFatura: null,
      valor: dto.valor,
      tipo: 'ENTRADA',
      descricao: `Transferência da conta ${dto.idContaOrigem}`,
      dataLancamento: new Date(),
      alvo: 'CONTA',
    } as any);

    // Criar a transferência associando aos lançamentos
    return this.prisma.transferencia.create({
      data: {
        idContaOrigem: dto.idContaOrigem,
        idContaDestino: dto.idContaDestino,
        valor: dto.valor,
        dataTransferencia: new Date(),
        idLancamentoOrigem: lancamentoOrigem.idLancamento,
        idLancamentoDestino: lancamentoDestino.idLancamento,
      } as any,
    });
  }

  findAll() {
    return this.prisma.transferencia.findMany({
      include: {
        lancamentoOrigem: true,
        lancamentoDestino: true,
      },
    });
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
