import { cookies } from "next/headers";

const COOKIE_NAME = "xicobless_materialsolicitation";

export function getSolicitacoes() {
  const cookie = cookies().get(COOKIE_NAME);
  return cookie ? JSON.parse(cookie.value) : [];
}

export function addSolicitacao(novaSolicitacao: any) {
  const solicitacoes = getSolicitacoes();
  solicitacoes.push(novaSolicitacao);
  cookies().set(COOKIE_NAME, JSON.stringify(solicitacoes));
}

export function atualizarSolicitacao(id: number, status: string) {
  let solicitacoes = getSolicitacoes();
  solicitacoes = solicitacoes.map((sol: any) =>
    sol.id === id ? { ...sol, status } : sol
  );
  cookies().set(COOKIE_NAME, JSON.stringify(solicitacoes));
}

export function limparSolicitacoes() {
  cookies().set(COOKIE_NAME, "[]");
}
