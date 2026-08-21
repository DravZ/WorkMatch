import { api } from '../api/axios'; 
//import { LoginRequest, LoginResponse } from '../../types/auth';

export const authService = {
  login(data: any) {
    return api.post<any>('/usuario/login', data);
  },

  /*register(data: RegisterRequest) {
    return api.post('/auth/register', data);
  },*/
};