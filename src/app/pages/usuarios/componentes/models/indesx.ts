export interface Usuario {
  id: number;
  nombre: string;
  correo: string;
  contrasena: string;
  role: string;
}

export interface CrearUsuarioPayload {
  nombre: string;
  correo: string;
  contrasena: string;
  role: string;
}
