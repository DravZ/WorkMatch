import type { Trabajador } from '../types/trabajador';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000';

export async function getTrabajadores(): Promise<Trabajador[]> {
  const res = await fetch(`${API_URL}/trabajadores`);
  if (!res.ok) throw new Error(`Error al obtener trabajadores: ${res.status}`);
  return res.json();
}