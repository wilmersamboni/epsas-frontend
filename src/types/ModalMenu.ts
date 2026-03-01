export interface AreaFormModalProps {
  isOpen: boolean;
  onClose: () => void;
  area?: {
    id_area?: number;
    nombre?: string;
    sede?: number;
  };
  onGuardadoExitoso: () => void;
}