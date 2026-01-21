import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateUsuarioDto } from './dto/create-usuarios.dto';
import { UpdateUsuarioDto } from './dto/update-usuarios.dto';

@Injectable()
export class UsuariosService {
  constructor(private readonly prisma: PrismaService) {}

  create(dto: CreateUsuarioDto) {
    return this.prisma.usuario.create({ data: dto as any });
  }

  findAll() {
    return this.prisma.usuario.findMany();
  }

  async findOne(id: number) {
    const usuario = await this.prisma.usuario.findUnique({
      where: { idUsuario: id },
    });

    if (!usuario) throw new NotFoundException('Usuário não encontrado');
    return usuario;
  }

  update(id: number, dto: UpdateUsuarioDto) {
    return this.prisma.usuario.update({
      where: { idUsuario: id },
      data: dto,
    });
  }

  remove(id: number) {
    return this.prisma.usuario.delete({
      where: { idUsuario: id },
    });
  }
}
