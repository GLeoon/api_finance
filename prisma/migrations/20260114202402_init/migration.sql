-- CreateTable
CREATE TABLE "Usuario" (
    "idUsuario" INTEGER NOT NULL,
    "nome" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "senha" TEXT NOT NULL,
    "data_cadastro" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Usuario_pkey" PRIMARY KEY ("idUsuario")
);

-- CreateTable
CREATE TABLE "Grupo" (
    "idGrupo" INTEGER NOT NULL,
    "nome" TEXT NOT NULL,
    "descricao" TEXT NOT NULL,

    CONSTRAINT "Grupo_pkey" PRIMARY KEY ("idGrupo")
);

-- CreateTable
CREATE TABLE "Conta" (
    "idConta" INTEGER NOT NULL,
    "idUsuario" INTEGER NOT NULL,
    "idGrupo" INTEGER,
    "tipo" TEXT NOT NULL,
    "saldoInicial" DOUBLE PRECISION NOT NULL,
    "dataCriacao" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Conta_pkey" PRIMARY KEY ("idConta","idUsuario")
);

-- CreateTable
CREATE TABLE "CartaoCredito" (
    "idCartao" INTEGER NOT NULL,
    "idUsuario" INTEGER NOT NULL,
    "nome" TEXT NOT NULL,
    "limite" DOUBLE PRECISION NOT NULL,
    "bandeira" TEXT NOT NULL,
    "validadeMes" INTEGER NOT NULL,
    "validadeAno" INTEGER NOT NULL,

    CONSTRAINT "CartaoCredito_pkey" PRIMARY KEY ("idCartao","idUsuario")
);

-- CreateTable
CREATE TABLE "Fatura" (
    "idFatura" INTEGER NOT NULL,
    "idCartao" INTEGER NOT NULL,
    "idUsuario" INTEGER NOT NULL,
    "mesReferencia" INTEGER NOT NULL,
    "anoReferencia" INTEGER NOT NULL,
    "dataFechamento" TIMESTAMP(3) NOT NULL,
    "dataVencimento" TIMESTAMP(3) NOT NULL,
    "valorTotal" DOUBLE PRECISION NOT NULL,
    "statusPagamento" TEXT NOT NULL,

    CONSTRAINT "Fatura_pkey" PRIMARY KEY ("idFatura")
);

-- CreateTable
CREATE TABLE "Lancamento" (
    "idLancamento" INTEGER NOT NULL,
    "idConta" INTEGER NOT NULL,
    "idUsuario" INTEGER NOT NULL,
    "idGrupo" INTEGER NOT NULL,
    "idFatura" INTEGER NOT NULL,
    "valor" DOUBLE PRECISION NOT NULL,
    "tipo" TEXT NOT NULL,
    "descricao" TEXT,
    "dataLancamento" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Lancamento_pkey" PRIMARY KEY ("idLancamento")
);

-- CreateTable
CREATE TABLE "Transferencia" (
    "idTransferencia" INTEGER NOT NULL,
    "idContaOrigem" INTEGER NOT NULL,
    "idContaDestino" INTEGER NOT NULL,
    "valor" DOUBLE PRECISION NOT NULL,
    "dataTransferencia" TIMESTAMP(3) NOT NULL,
    "idLancamentoOrigem" INTEGER NOT NULL,
    "idLancamentoDestino" INTEGER NOT NULL,

    CONSTRAINT "Transferencia_pkey" PRIMARY KEY ("idTransferencia")
);

-- CreateIndex
CREATE UNIQUE INDEX "Usuario_email_key" ON "Usuario"("email");

-- AddForeignKey
ALTER TABLE "Conta" ADD CONSTRAINT "Conta_idUsuario_fkey" FOREIGN KEY ("idUsuario") REFERENCES "Usuario"("idUsuario") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Conta" ADD CONSTRAINT "Conta_idGrupo_fkey" FOREIGN KEY ("idGrupo") REFERENCES "Grupo"("idGrupo") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CartaoCredito" ADD CONSTRAINT "CartaoCredito_idUsuario_fkey" FOREIGN KEY ("idUsuario") REFERENCES "Usuario"("idUsuario") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Fatura" ADD CONSTRAINT "Fatura_idCartao_idUsuario_fkey" FOREIGN KEY ("idCartao", "idUsuario") REFERENCES "CartaoCredito"("idCartao", "idUsuario") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Lancamento" ADD CONSTRAINT "Lancamento_idUsuario_fkey" FOREIGN KEY ("idUsuario") REFERENCES "Usuario"("idUsuario") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Lancamento" ADD CONSTRAINT "Lancamento_idGrupo_fkey" FOREIGN KEY ("idGrupo") REFERENCES "Grupo"("idGrupo") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Lancamento" ADD CONSTRAINT "Lancamento_idFatura_fkey" FOREIGN KEY ("idFatura") REFERENCES "Fatura"("idFatura") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Lancamento" ADD CONSTRAINT "Lancamento_idConta_idUsuario_fkey" FOREIGN KEY ("idConta", "idUsuario") REFERENCES "Conta"("idConta", "idUsuario") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Transferencia" ADD CONSTRAINT "Transferencia_idLancamentoOrigem_fkey" FOREIGN KEY ("idLancamentoOrigem") REFERENCES "Lancamento"("idLancamento") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Transferencia" ADD CONSTRAINT "Transferencia_idLancamentoDestino_fkey" FOREIGN KEY ("idLancamentoDestino") REFERENCES "Lancamento"("idLancamento") ON DELETE RESTRICT ON UPDATE CASCADE;
