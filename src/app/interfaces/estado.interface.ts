export interface IDataSchemeEstado {
  message: string;
  resumen: any;
  resumenList: { aprobado: number; rechazado: number; pendiente: number; }[];
  success: boolean;
}
