import type { Usuario } from '../types/usuario';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000';

export async function getUsuarios(): Promise<Usuario[]> {
  const res = await fetch(`${API_URL}/usuario`);
  if (!res.ok) throw new Error(`Error al obtener usuarios: ${res.status}`);
  return res.json();
}