import { apiFetch } from "@/lib/api";

export async function login(email: string, password: string) {
  return apiFetch("/user/auth", {
    method: "POST",
    body: JSON.stringify({ email, password }),
  });
}

export async function register(data: any) {
  return apiFetch("/user", {
    method: "POST",
    body: JSON.stringify(data),
  });
}

export async function ensureUserExists() {
  try {
    await login("aluno@teste.com", "123456");
  } catch (err) {
    await register({
      username: "Aluno",
      email: "aluno@teste.com",
      password: "123456",
    });
  }
}
