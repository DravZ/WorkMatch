import { api } from '../api/axios';

export const vacanteService = {

  create(data: any) {
    return api.post<any>('/vacante', data);
  },

  findAll() {
    return api.get<any>('/vacante');
  },

  findByEmpresaId(id_empresa: number) {
    return api.get<any>(`/vacante/empresa/${id_empresa}`);
  },

  findById(id_vacante: number) {
    return api.get<any>(`/vacante/${id_vacante}`);
  },

  update(id_vacante: number, data: any) {
    return api.patch<any>(`/vacante/${id_vacante}`, data);
  },

  remove(id_vacante: number) {
    return api.delete<any>(`/vacante/${id_vacante}`);
  },

};