export interface Props {
  isOpen: boolean;
  onClose: () => void;
  alumno: any;
  onReopen?: () => void;
}