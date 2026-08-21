import { api } from '../api/axios';

export const authService = {
  login(data: any) {
    return api.post<any>('/usuario/login', data);
  },

  register(data: any) {
    return api.post<any>('/usuario', data);
  },
};