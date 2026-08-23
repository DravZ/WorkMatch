import { api } from '../api/axios';

export const empresaService = {

  create(data: any) {
    return api.post<any>('/empresa', data);
  },

  findByUsuarioId(id_usuario: number) {
    return api.get<any>(`/empresa/usuario/${id_usuario}`);
  },

  findById(id_empresa: number) {
    return api.get<any>(`/empresa/${id_empresa}`);
  },

  update(id_empresa: number, data: any) {
    return api.patch<any>(`/empresa/${id_empresa}`, data);
  },

  getEstadisticas(id_empresa: number) {
    return api.get<any>(`/empresa/${id_empresa}/estadisticas`);
  },

};