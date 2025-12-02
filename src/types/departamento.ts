export interface inputDepartamento{
    nombre: string

}

export interface Departamento extends inputDepartamento {
    id: number; // Un identificador único (puede ser string/UUID si usas ese formato)
}

export type registrarDepartamento = (data: inputDepartamento) => void;