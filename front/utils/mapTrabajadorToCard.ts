import type { Trabajador } from '../types/trabajador';

export function mapTrabajadorToCard(t: Trabajador) {
  const fullName = t.usuario?.fullName ?? 'Nombre no registrado';
  const [first = '', second = ''] = fullName.trim().split(' ');

  return {
    id: t.id_trabajador,
    name: fullName,
    initials: `${first[0] ?? ''}${second[0] ?? ''}`.toUpperCase(),
    profession: t.especialidad_carrera ?? 'Sin especialidad registrada',
    verified: t.is_verified ?? false,
    price: t.tarifa_hora ?? 0,
    rating: t.calificacion ?? 0,
    reviews: t.total_calificaciones ?? 0,
    // Placeholder: 'experiencia' es texto libre en el backend, no un conteo.
    // Queda en 0 hasta que exista un campo numérico real para "jobs completados".
    jobs: 0,//t.trabajos_completados,//
    location: t.ubicacion ?? 'Ubicación no registrada',
    // disponibilidad ahora es texto libre del backend (ej. "available now", "weekends")
    available: t.disponibilidad ?? '',
    services: t.habilidades?.map((h) => h.nombre) ?? [],
    // Nuevo: usado solo para el filtro de CategoryTabs, no es prop de CardW
    areaTrabajo: t.area_trabajo ?? '',
  };
}