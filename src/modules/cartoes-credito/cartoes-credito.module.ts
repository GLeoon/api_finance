
import { Module } from '@nestjs/common';
import { CartoesService } from './cartoes-credito.service';
import { CartoesController } from './cartoes-credito.controller';

@Module({
  controllers: [CartoesController],
  providers: [CartoesService],
})
export class CartoesModule {}
