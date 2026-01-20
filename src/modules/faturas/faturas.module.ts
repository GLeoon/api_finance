
import { Module } from '@nestjs/common';
import { FaturasService } from './faturas.service';
import { FaturasController } from './faturas.controller';

@Module({
  controllers: [FaturasController],
  providers: [FaturasService],
})
export class FaturasModule {}
