import { Module } from '@nestjs/common';
import { CartoesCreditoService } from './cartoes-credito.service';
import { CartoesCreditoController } from './cartoes-credito.controller';

@Module({
  controllers: [CartoesCreditoController],
  providers: [CartoesCreditoService],
})
export class CartoesModule {}
