export type RolUsuario = 'ESTUDIANTE' | 'DOCENTE' | 'ADMIN'

export interface Usuario{
  id: number;
  nombre: string;
  apellido:string;
  email: string;
  username:string;
  rol: RolUsuario;
   estado: 'INACTIVO'| 'ACTIVO';
   imagen?: string;
}
