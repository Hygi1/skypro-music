import api from './client';
import { User, AuthResponse } from '@/lib/types/api';

export const signup = (email: string, password: string, username: string) =>
  api.post<{ message: string; result: User; success: boolean }>('/user/signup/', { email, password, username });

export const login = (email: string, password: string) =>
  api.post<User>('/user/login/', { email, password });

export const getTokens = (email: string, password: string) =>
  api.post<AuthResponse>('/user/token/', { email, password });