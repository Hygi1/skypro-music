import { updateAccessToken, logout } from "@/lib/store/authSlice";
import { store } from "@/lib/store/store";

const BASE_URL = "https://webdev-music-003b5b991590.herokuapp.com";

type RequestOptions = RequestInit & {
  body?: unknown;
};

async function request<T = unknown>(
  endpoint: string,
  options: RequestOptions = {}
): Promise<T> {
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
            throw new Error(error.message || error.detail || "Request failed");
          }
          return retryResponse.json();
        } else {
          store.dispatch(logout());
          const errorData = await refreshResponse.json();
          throw new Error(
            errorData.message ||
              errorData.detail ||
              "Сессия истекла, войдите заново"
          );
        }
      } else {
        store.dispatch(logout());
        const errorData = await response.json();
        throw new Error(
          errorData.message || errorData.detail || "Не авторизован"
        );
      }
    }

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || error.detail || "Ошибка запроса");
    }

    return response.json();
  } catch (err) {
    clearTimeout(timeoutId);
    if (err instanceof Error && err.name === "AbortError") {
      throw new Error("Сервер не отвечает, попробуйте позже");
    }
    throw err;
  }
}

export default {
  get: <T = unknown>(endpoint: string) =>
    request<T>(endpoint, { method: "GET" }),
  post: <T = unknown>(endpoint: string, body: unknown) =>
    request<T>(endpoint, { method: "POST", body: JSON.stringify(body) }),
  put: <T = unknown>(endpoint: string, body: unknown) =>
    request<T>(endpoint, { method: "PUT", body: JSON.stringify(body) }),
  delete: <T = unknown>(endpoint: string) =>
    request<T>(endpoint, { method: "DELETE" }),
};
