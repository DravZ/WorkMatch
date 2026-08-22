import type { Usuario } from '../types/usuario';

export function mapUsuarioToCard(u: Usuario) {
  const fullName = `${u.nombre} ${u.apellido}`.trim();

  return {
    id: u.id_usuario,
    name: fullName,
    initials: `${u.nombre[0] ?? ''}${u.apellido[0] ?? ''}`.toUpperCase(),
    profession: 'Sin especialidad registrada',
    location: 'Ubicación no registrada',
    price: 0,
    rating: 0,
    reviews: 0,
    jobs: 0,
    verified: false,
    available: false,
    services: [] as string[],
  };
}