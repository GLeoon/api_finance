
import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class TransferenciasService {
  constructor(private prisma: PrismaService) {}
}
