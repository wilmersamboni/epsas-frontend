 export interface CursoFormModalProps {
  isOpen: boolean;
  onClose: () => void;
  curso?: {
    id_curso?: number;
    codigo?: number;
    fecha_inicio?: Date;
    fecha_fin?: Date;
    fin_lectiva?: Date;
    fk_area?: number;
    fk_programa?: number;
    lider?: number;
  };
  onGuardadoExitoso: () => void;
}