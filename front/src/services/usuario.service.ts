import { api } from '../api/axios';

export const usuarioService = {

  findAll() {
    return api.get<any>('/usuario');
  },

  findById(id_usuario: number) {
    return api.get<any>(`/usuario/${id_usuario}`);
  },

  update(id_usuario: number, data: any) {
    return api.patch<any>(`/usuario/${id_usuario}`, data);
  },

  remove(id_usuario: number) {
    return api.delete<any>(`/usuario/${id_usuario}`);
  },

};