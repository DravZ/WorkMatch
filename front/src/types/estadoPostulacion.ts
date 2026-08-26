export const EstadoPostulacion = {
  PENDIENTE : "pendiente",
  ACEPTADA : "aceptada",
  RECHAZADA : "rechazada",
  REVOCADA : "revocada",
  EN_PROCESO : "en_proceso",
  FINALIZADA : "finalizada",
} as const;

export type EstadoPostulacion =
  (typeof EstadoPostulacion)[keyof typeof EstadoPostulacion];