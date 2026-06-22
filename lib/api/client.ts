import { updateAccessToken, logout } from "@/lib/store/authSlice";
import { store } from "@/lib/store/store";

const BASE_URL = "https://webdev-music-003b5b991590.herokuapp.com";

async function request(endpoint: string, options: RequestInit = {}) {
  const url = `${BASE_URL}${endpoint}`;
  const headers: Record<string, string> = {
    "Content-Type": "application/json",
  };

  if (options.headers) {
    Object.assign(headers, options.headers);
  }

  const accessToken = store.getState().auth.accessToken;
  if (accessToken) {
    headers["Authorization"] = `Bearer ${accessToken}`;
  }

  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), 10000);

  try {
    const response = await fetch(url, {
      ...options,
      headers,
      signal: controller.signal,
    });
    clearTimeout(timeoutId);

    if (response.status === 401) {
      const refreshToken = store.getState().auth.refreshToken;
      if (refreshToken) {
        const refreshResponse = await fetch(`${BASE_URL}/user/token/refresh/`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ refresh: refreshToken }),
        });
        if (refreshResponse.ok) {
          const { access } = await refreshResponse.json();
          store.dispatch(updateAccessToken(access));
          headers["Authorization"] = `Bearer ${access}`;
          const retryResponse = await fetch(url, { ...options, headers });
          if (!retryResponse.ok) {
            const error = await retryResponse.json();
            throw new Error(error.message || "Request failed");
          }
          return retryResponse.json();
        } else {
          store.dispatch(logout());
          throw new Error("Сессия истекла, войдите заново");
        }
      } else {
        store.dispatch(logout());
        throw new Error("Не авторизован");
      }
    }

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || error.detail || "Ошибка запроса");
    }

    return response.json();
  } catch (err: any) {
    clearTimeout(timeoutId);
    if (err.name === "AbortError") {
      throw new Error("Сервер не отвечает, попробуйте позже");
    }
    throw err;
  }
}

export default {
  get: (endpoint: string) => request(endpoint, { method: "GET" }),
  post: (endpoint: string, body: any) =>
    request(endpoint, { method: "POST", body: JSON.stringify(body) }),
  put: (endpoint: string, body: any) =>
    request(endpoint, { method: "PUT", body: JSON.stringify(body) }),
  delete: (endpoint: string) => request(endpoint, { method: "DELETE" }),
};
