import api from "./client";

export const signup = (email: string, password: string, username: string) =>
  api.post("/user/signup/", { email, password, username });

export const login = (email: string, password: string) =>
  api.post("/user/login/", { email, password });

export const getTokens = (email: string, password: string) =>
  api.post("/user/token/", { email, password });
