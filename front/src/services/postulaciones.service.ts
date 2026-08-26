import { api } from '../api/axios';

export const postulacionService = {

  // =========================================================
  // CREAR POSTULACIÓN
  // =========================================================
  create(data: any) {
    return api.post<any>('/postulacion', data);
  },

  // =========================================================
  // OBTENER TODAS
  // =========================================================
  findAll() {
    return api.get<any>('/postulacion');
  },

  // =========================================================
  // OBTENER POR USUARIO
  // =========================================================
  findByUsuario(id_usuario: number) {
    return api.get<any>(`/postulacion/usuario/${id_usuario}`);
  },

  // =========================================================
  // OBTENER POR VACANTE
  // =========================================================
  findByVacante(id_vacante: number) {
    return api.get<any>(`/postulacion/vacante/${id_vacante}`);
  },

  // =========================================================
  // OBTENER POR EMPRESA
  // =========================================================
  findByEmpresa(id_empresa: number) {
    return api.get<any>(`/postulacion/empresa/${id_empresa}`);
  },

  // =========================================================
  // OBTENER UNA POSTULACIÓN
  // =========================================================
  findById(id_postulacion: number) {
    return api.get<any>(`/postulacion/${id_postulacion}`);
  },

  // =========================================================
  // ACEPTAR
  // =========================================================
  aceptar(id_postulacion: number) {
    return api.patch<any>(`/postulacion/${id_postulacion}/aceptar`);
  },

  // =========================================================
  // RECHAZAR
  // =========================================================
  rechazar(id_postulacion: number) {
    return api.patch<any>(`/postulacion/${id_postulacion}/rechazar`);
  },

  // =========================================================
  // REVOCAR
  // =========================================================
  revocar(id_postulacion: number) {
    return api.patch<any>(`/postulacion/${id_postulacion}/revocar`);
  },

  // =========================================================
  // FINALIZAR TRABAJO
  // =========================================================
  finalizar(id_postulacion: number) {
    return api.patch<any>(`/postulacion/${id_postulacion}/finalizar`);
  },

  // =========================================================
  // ELIMINAR
  // =========================================================
  remove(id_postulacion: number) {
    return api.delete<any>(`/postulacion/${id_postulacion}`);
  },

};