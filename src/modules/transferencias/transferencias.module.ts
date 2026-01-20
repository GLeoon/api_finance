
import { Module } from '@nestjs/common';
import { TransferenciasService } from './transferencias.service';
import { TransferenciasController } from './transferencias.controller';

@Module({
  controllers: [TransferenciasController],
  providers: [TransferenciasService],
})
export class TransferenciasModule {}
