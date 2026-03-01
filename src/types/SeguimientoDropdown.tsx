export interface PropsDropdown {
  item: any;
  alumnoId: number;
  onEditar: (item: any) => void;
  refrescar: () => void;
}