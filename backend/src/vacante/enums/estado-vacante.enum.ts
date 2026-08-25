export const EstadoVacante = {
  ACTIVA: "activa",
  COMPLETADA: "completada",
  CERRADA: "cerrada",
  CANCELADA: "cancelada",
  INACTIVA: 'inactiva',   
} as const;

export type EstadoVacante =
  (typeof EstadoVacante)[keyof typeof EstadoVacante];