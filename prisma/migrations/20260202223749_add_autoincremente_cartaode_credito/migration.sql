-- AlterTable
CREATE SEQUENCE cartaocredito_idcartao_seq;
ALTER TABLE "CartaoCredito" ALTER COLUMN "idCartao" SET DEFAULT nextval('cartaocredito_idcartao_seq');
ALTER SEQUENCE cartaocredito_idcartao_seq OWNED BY "CartaoCredito"."idCartao";
