export type RolUsuario = 'ESTUDIANTE' | 'DOCENTE' | 'ADMIN'

export interface Usuario{
  id: number;
  nombre: string;
  email: string;
  rol: RolUsuario;
}
