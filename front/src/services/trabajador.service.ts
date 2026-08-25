import { api } from '../api/axios';

export const trabajadorService = {
  create(data: any) {
    return api.post<any>('/trabajadores', data);
  },

  findAll() {
    return api.get<any>('/trabajadores');
  },

  findById(id_trabajador: number) {
    return api.get<any>(`/trabajadores/${id_trabajador}`);
  },

  findByIdUsuario(idUsuario: number) {
    return api.get<any>(`/trabajadores/usuario/${idUsuario}`);
  },

  update(id_trabajador: number, data: any) {
    return api.put<any>(`/trabajadores/${id_trabajador}`, data);
  },

  updateByIdUsuario(idUsuario: number, data: any) {
    return api.put<any>(`/trabajadores/usuario/${idUsuario}`, data);
  },

  remove(id_trabajador: number) {
    return api.delete<any>(`/trabajadores/${id_trabajador}`);
  },
};