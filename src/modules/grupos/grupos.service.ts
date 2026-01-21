import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateGrupoDto } from './dto/create-grupos.dto';
import { UpdateGrupoDto } from './dto/update-grupos.dto';

@Injectable()
export class GruposService {
  constructor(private readonly prisma: PrismaService) {}

  create(dto: CreateGrupoDto) {
    return this.prisma.grupo.create({ data: dto as any });
  }

  findAll() {
    return this.prisma.grupo.findMany();
  }

  async findOne(id: number) {
    const grupo = await this.prisma.grupo.findUnique({
      where: { idGrupo: id },
    });

    if (!grupo) throw new NotFoundException('Grupo não encontrado');
    return grupo;
  }

  update(id: number, dto: UpdateGrupoDto) {
    return this.prisma.grupo.update({
      where: { idGrupo: id },
      data: dto,
    });
  }

  remove(id: number) {
    return this.prisma.grupo.delete({
      where: { idGrupo: id },
    });
  }
}
