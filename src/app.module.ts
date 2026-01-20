import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsuariosModule } from './modules/usuarios/usuarios.module';
import { ContasModule } from './modules/contas/contas.module';
import { CartoesModule } from './modules/cartoes-credito/cartoes-credito.module';
import { FaturasModule } from './modules/faturas/faturas.module';
import { LancamentosModule } from './modules/lancamentos/lancamentos.module';
import { TransferenciasModule } from './modules/transferencias/transferencias.module';
import { GruposModule } from './modules/grupos/grupos.module';
import { PrismaModule } from './modules/prisma/prisma.module';

@Module({
  imports: [
    PrismaModule,
    UsuariosModule,
    GruposModule,
    ContasModule,
    CartoesModule,
    FaturasModule,
    LancamentosModule,
    TransferenciasModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
