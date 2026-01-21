import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateFaturaDto } from './dto/create-faturas.dto';
import { UpdateFaturaDto } from './dto/update-faturas.dto';

@Injectable()
export class FaturasService {
  constructor(private readonly prisma: PrismaService) {}

  create(dto: CreateFaturaDto) {
    return this.prisma.fatura.create({
      data: {
        ...dto,
      } as any,
    });
  }

  findAll() {
    return this.prisma.fatura.findMany({
      include: { cartao: true },
    });
  }

  async findOne(id: number) {
    const fatura = await this.prisma.fatura.findUnique({
      where: { idFatura: id },
    });

    if (!fatura) throw new NotFoundException('Fatura não encontrada');
    return fatura;
  }

  update(id: number, dto: UpdateFaturaDto) {
    return this.prisma.fatura.update({
      where: { idFatura: id },
      data: dto,
    });
  }

  remove(id: number) {
    return this.prisma.fatura.delete({
      where: { idFatura: id },
    });
  }
}
