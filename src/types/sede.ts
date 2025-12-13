export interface Sede {
  id_sede: number;
  nombre: string;
  fk_centro_formacion: number;
}

export interface InputSede {
  nombre: string;
  centro_formacion_fk: number;
}