/*
  Warnings:

  - You are about to drop the column `saldoInicial` on the `Conta` table. All the data in the column will be lost.
  - Added the required column `saldo` to the `Conta` table without a default value. This is not possible if the table is not empty.
  - Added the required column `alvo` to the `Lancamento` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "AlvoLancamento" AS ENUM ('CONTA', 'FATURA');

-- AlterTable
ALTER TABLE "Conta" DROP COLUMN "saldoInicial",
ADD COLUMN     "saldo" DOUBLE PRECISION NOT NULL;

-- AlterTable
ALTER TABLE "Lancamento" ADD COLUMN     "alvo" "AlvoLancamento" NOT NULL,
ALTER COLUMN "dataLancamento" SET DEFAULT CURRENT_TIMESTAMP;
