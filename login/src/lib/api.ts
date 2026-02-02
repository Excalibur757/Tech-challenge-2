const API_URL = process.env.NEXT_PUBLIC_API_URL;

if (!API_URL) {
  throw new Error("NEXT_PUBLIC_API_URL não está definida");
}

export async function apiFetch<T = any>(
  endpoint: string,
  options: RequestInit = {},
  token?: string
): Promise<T> {
  const res = await fetch(`${API_URL}${endpoint}`, {
    ...options,
    headers: {
      "Content-Type": "application/json",
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
      ...options.headers,
    },
  });

  let data;
  try {
    data = await res.json();
  } catch {
    throw new Error("Resposta inválida da API");
  }

  if (!res.ok) {
    throw new Error(data?.message || "Erro na comunicação com a API");
  }

  return data;
}
