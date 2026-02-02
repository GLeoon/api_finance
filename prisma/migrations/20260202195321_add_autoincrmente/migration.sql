-- AlterTable
CREATE SEQUENCE conta_idconta_seq;
ALTER TABLE "Conta" ALTER COLUMN "idConta" SET DEFAULT nextval('conta_idconta_seq'),
ALTER COLUMN "dataCriacao" SET DEFAULT CURRENT_TIMESTAMP;
ALTER SEQUENCE conta_idconta_seq OWNED BY "Conta"."idConta";
