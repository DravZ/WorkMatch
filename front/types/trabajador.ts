export type Habilidad = {
  id_habilidad: number;
  nombre: string;
};

export type UsuarioResumen = {
  id_usuario: number;
  fullName: string;
  email: string;
  is_verified: boolean;
};

export type Trabajador = {
  id_trabajador: number;
  usuario: UsuarioResumen;
  ubicacion?: string;
  tarifa_hora?: number;
  experiencia?: string;
  calificacion: number;
  total_calificaciones: number;
  especialidad_carrera?: string;
  area_trabajo?: string;
  is_verified: boolean;
  disponibilidad?: string;
  habilidades: Habilidad[];
};