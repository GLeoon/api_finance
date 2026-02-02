-- AlterTable
CREATE SEQUENCE fatura_idfatura_seq;
ALTER TABLE "Fatura" ALTER COLUMN "idFatura" SET DEFAULT nextval('fatura_idfatura_seq');
ALTER SEQUENCE fatura_idfatura_seq OWNED BY "Fatura"."idFatura";

-- AlterTable
CREATE SEQUENCE grupo_idgrupo_seq;
ALTER TABLE "Grupo" ALTER COLUMN "idGrupo" SET DEFAULT nextval('grupo_idgrupo_seq');
ALTER SEQUENCE grupo_idgrupo_seq OWNED BY "Grupo"."idGrupo";

-- AlterTable
CREATE SEQUENCE lancamento_idlancamento_seq;
ALTER TABLE "Lancamento" ALTER COLUMN "idLancamento" SET DEFAULT nextval('lancamento_idlancamento_seq');
ALTER SEQUENCE lancamento_idlancamento_seq OWNED BY "Lancamento"."idLancamento";

-- AlterTable
CREATE SEQUENCE transferencia_idtransferencia_seq;
ALTER TABLE "Transferencia" ALTER COLUMN "idTransferencia" SET DEFAULT nextval('transferencia_idtransferencia_seq');
ALTER SEQUENCE transferencia_idtransferencia_seq OWNED BY "Transferencia"."idTransferencia";

-- AlterTable
CREATE SEQUENCE usuario_idusuario_seq;
ALTER TABLE "Usuario" ALTER COLUMN "idUsuario" SET DEFAULT nextval('usuario_idusuario_seq');
ALTER SEQUENCE usuario_idusuario_seq OWNED BY "Usuario"."idUsuario";
