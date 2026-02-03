-- DropForeignKey
ALTER TABLE "Lancamento" DROP CONSTRAINT "Lancamento_idFatura_fkey";

-- AlterTable
ALTER TABLE "Lancamento" ALTER COLUMN "idFatura" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "Lancamento" ADD CONSTRAINT "Lancamento_idFatura_fkey" FOREIGN KEY ("idFatura") REFERENCES "Fatura"("idFatura") ON DELETE SET NULL ON UPDATE CASCADE;
