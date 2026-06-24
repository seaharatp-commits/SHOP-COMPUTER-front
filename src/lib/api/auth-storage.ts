const STORAGE_KEY = "shop-computer-auth";

export interface StoredAuth {
  accessToken: string;
  refreshToken: string;
}

export const getStoredAuth = (): StoredAuth | null => {
  if (typeof window === "undefined") return null;
  const raw = window.localStorage.getItem(STORAGE_KEY);
  if (!raw) return null;
  try {
    return JSON.parse(raw);
  } catch {
    return null;
  }
};

export const setStoredAuth = (auth: StoredAuth | null) => {
  if (typeof window === "undefined") return;
  if (auth) window.localStorage.setItem(STORAGE_KEY, JSON.stringify(auth));
  else window.localStorage.removeItem(STORAGE_KEY);
};
