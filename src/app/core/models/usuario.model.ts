export type RolUsuario = 'ESTUDIANTE' | 'DOCENTE' | 'ADMIN';
export type EstadoUsuario = 'ACTIVO' | 'INACTIVO';

export interface Usuario {
  id: number;
  nombre: string;
  apellido: string;
  email: string;
  username: string;
  rol: RolUsuario;
  estado: EstadoUsuario;
  imagen?: string;
}

export interface LoginRequest {
  username: string;
  password: string;
}

export interface LoginResponse {
  token: string;
  tipo: string;
  id: number;
  username: string;
  nombre: string;
  apellido: string;
  email: string;
  rol: RolUsuario;
}

export interface RegisterRequest {
  nombre: string;
  apellido: string;
  email: string;
  username: string;
  password: string;
  rol: RolUsuario;
}

// ─── UTILIDAD: detectar rol por formato de email ──────────────────────────
export function detectarRolPorEmail(email: string): RolUsuario {
  const correo = email.toLowerCase().trim();
  if (!correo.endsWith('@unicolombo.edu.co')) return 'ESTUDIANTE';
  if (correo.startsWith('docente')) return 'DOCENTE';
  return 'ESTUDIANTE';
}
