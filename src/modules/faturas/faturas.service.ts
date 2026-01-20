
import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class FaturasService {
  constructor(private prisma: PrismaService) {}
}
