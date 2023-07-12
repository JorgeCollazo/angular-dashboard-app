export interface IDataSchemeTipoDoc {
  message: string;
  resumenDoc: any;
  resumenDocList: { fact: number; cred: number; deb: number;}[];
  success: boolean;
}
