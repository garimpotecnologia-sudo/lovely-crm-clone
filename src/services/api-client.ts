const HELENA_BASE_URL = "https://api.helena.run/core/v1";
const ASAAS_BASE_URL = "https://api.asaas.com/v3";

interface RequestOptions {
  method?: string;
  body?: unknown;
  token?: string;
}

async function request<T>(
  baseUrl: string,
  path: string,
  options: RequestOptions = {}
): Promise<T> {
  const { method = "GET", body, token } = options;

  const headers: Record<string, string> = {
    "Content-Type": "application/json",
  };

  if (token) {
    headers["Authorization"] = `Bearer ${token}`;
  }

  const response = await fetch(`${baseUrl}${path}`, {
    method,
    headers,
    body: body ? JSON.stringify(body) : undefined,
  });

  if (!response.ok) {
    const errorText = await response.text().catch(() => "Unknown error");
    throw new Error(
      `API Error ${response.status}: ${errorText}`
    );
  }

  return response.json();
}

export const helenaApi = {
  get: <T>(path: string, token?: string) =>
    request<T>(HELENA_BASE_URL, path, { token }),
  post: <T>(path: string, body: unknown, token?: string) =>
    request<T>(HELENA_BASE_URL, path, { method: "POST", body, token }),
  put: <T>(path: string, body: unknown, token?: string) =>
    request<T>(HELENA_BASE_URL, path, { method: "PUT", body, token }),
  delete: <T>(path: string, token?: string) =>
    request<T>(HELENA_BASE_URL, path, { method: "DELETE", token }),
};

export const asaasApi = {
  get: <T>(path: string, token?: string) =>
    request<T>(ASAAS_BASE_URL, path, { token }),
  post: <T>(path: string, body: unknown, token?: string) =>
    request<T>(ASAAS_BASE_URL, path, { method: "POST", body, token }),
};
