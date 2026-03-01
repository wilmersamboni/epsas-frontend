export interface Props {
  item: any;
  alumnoId: number;
  onDetalle: (item: any) => void;
  onEditar: (item: any) => void;
  refrescar: () => void;
}