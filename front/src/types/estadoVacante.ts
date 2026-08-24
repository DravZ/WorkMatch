export const EstadoVacante = {
  ACTIVA: "activa",
  COMPLETADA: "completada",
  CERRADA: "cerrada",
  CANCELADA: "cancelada",
} as const;

export type EstadoVacante =
  (typeof EstadoVacante)[keyof typeof EstadoVacante];