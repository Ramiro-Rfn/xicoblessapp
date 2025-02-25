import { NextResponse } from "next/server";

import { addSolicitacao, atualizarSolicitacao, getSolicitacoes } from '@/services/solicitationService';

export async function GET() {
    const solicitacoes = getSolicitacoes();
    return NextResponse.json(solicitacoes);
  }

  // ✅ POST - Adiciona uma nova solicitação
  export async function POST(req: Request) {
    const { material, quantidade, solicitante } = await req.json();
    const novaSolicitacao = {
      id: crypto.randomUUID(),
      material,
      quantidade,
      status: "pendente",
      dataSolicitacao: new Date().toISOString().split("T")[0],
      solicitante,
    };

    addSolicitacao(novaSolicitacao);
    return NextResponse.json({ message: "Solicitação adicionada!", novaSolicitacao });
  }

  // ✅ PUT - Atualiza o status da solicitação
  export async function PUT(req: Request) {
    const { id, status } = await req.json();
    atualizarSolicitacao(id, status);
    return NextResponse.json({ message: "Status atualizado!" });
  }
