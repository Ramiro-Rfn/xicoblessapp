import { cookies, type UnsafeUnwrappedCookies } from "next/headers";

const COOKIE_NAME = "xicobless_materialsolicitation";

export function getSolicitacoes() {
  const cookie = (cookies() as unknown as UnsafeUnwrappedCookies).get(COOKIE_NAME);
  return cookie ? JSON.parse(cookie.value) : [];
}

export function addSolicitacao(novaSolicitacao: any) {
  const solicitacoes = getSolicitacoes();
  solicitacoes.push(novaSolicitacao);
  (cookies() as unknown as UnsafeUnwrappedCookies).set(COOKIE_NAME, JSON.stringify(solicitacoes));
}

export function atualizarSolicitacao(id: number, status: string) {
  let solicitacoes = getSolicitacoes();
  solicitacoes = solicitacoes.map((sol: any) =>
    sol.id === id ? { ...sol, status } : sol
  );
  (cookies() as unknown as UnsafeUnwrappedCookies).set(COOKIE_NAME, JSON.stringify(solicitacoes));
}

export function limparSolicitacoes() {
  (cookies() as unknown as UnsafeUnwrappedCookies).set(COOKIE_NAME, "[]");
}
