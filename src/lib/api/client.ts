import { API_BASE_URL } from "./config";
import { getStoredAuth, setStoredAuth } from "./auth-storage";

export class ApiError extends Error {
  constructor(
    message: string,
    public status: number,
  ) {
    super(message);
  }
}

interface RequestOptions extends RequestInit {
  auth?: boolean; // attach Authorization header (default: true on client, ignored on server)
  skipRefresh?: boolean;
}

let refreshPromise: Promise<string | null> | null = null;

async function refreshAccessToken(): Promise<string | null> {
  const stored = getStoredAuth();
  if (!stored?.refreshToken) return null;

  if (!refreshPromise) {
    refreshPromise = fetch(`${API_BASE_URL}/auth/refresh`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ refreshToken: stored.refreshToken }),
    })
      .then(async (res) => {
        if (!res.ok) {
          setStoredAuth(null);
          return null;
        }
        const data = await res.json();
        setStoredAuth({ accessToken: data.accessToken, refreshToken: data.refreshToken });
        return data.accessToken as string;
      })
      .catch(() => {
        setStoredAuth(null);
        return null;
      })
      .finally(() => {
        refreshPromise = null;
      });
  }
  return refreshPromise;
}

export async function apiFetch<T>(path: string, options: RequestOptions = {}): Promise<T> {
  const { auth = true, skipRefresh, headers, ...rest } = options;
  const stored = auth ? getStoredAuth() : null;

  const finalHeaders: HeadersInit = {
    "Content-Type": "application/json",
    ...(stored?.accessToken ? { Authorization: `Bearer ${stored.accessToken}` } : {}),
    ...headers,
  };

  const response = await fetch(`${API_BASE_URL}${path}`, { ...rest, headers: finalHeaders });

  if (response.status === 401 && auth && !skipRefresh && stored?.refreshToken) {
    const newAccessToken = await refreshAccessToken();
    if (newAccessToken) {
      return apiFetch<T>(path, { ...options, skipRefresh: true });
    }
  }

  if (!response.ok) {
    const body = await response.json().catch(() => ({ message: response.statusText }));
    throw new ApiError(body.message ?? "เกิดข้อผิดพลาด", response.status);
  }

  if (response.status === 204) return undefined as T;
  return response.json();
}
