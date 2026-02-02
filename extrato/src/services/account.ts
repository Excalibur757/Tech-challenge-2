import { apiFetch } from "@/lib/api";

export async function getAccount(token: string) {
  return apiFetch("/account", {}, token);
}

export async function createTransaction(data: any, token: string) {
  return apiFetch("/account/transaction", {
    method: "POST",
    body: JSON.stringify(data),
  }, token);
}

export async function getStatement(accountId: string, token: string) {
  return apiFetch(`/account/${accountId}/statement`, {}, token);
}
